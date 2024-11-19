"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const statItemSchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  count: z.number().min(0, "Count must be a positive number"),
  title: z.string().min(1, "Title is required"),
});

const statsSchema = z.object({
  stats: z.array(statItemSchema).min(1, "At least one stat item is required"),
});

type StatsFormData = z.infer<typeof statsSchema>;

export default function StatsEditor() {
  const queryClient = useQueryClient();

  const { data: statsData, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sections")
        .select("*")
        .eq("name", "Stats")
        .single();

      if (error) throw error;
      return data;
    },
  });

  //   if (!statsData || !statsData.content) {
  //     return <div>No data available</div>;
  //   }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StatsFormData>({
    resolver: zodResolver(statsSchema),
    defaultValues: (statsData?.content as StatsFormData) || {
      stats: [{ icon: "", count: 0, title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stats",
  });

  const createMutation = useMutation({
    mutationFn: async (data: StatsFormData) => {
      const { error } = await supabase.from("sections").insert({
        name: "Statistics",
        content: data,
        type: "static",
        display_order: 1,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Stats section created successfully");
      reset({ stats: [{ icon: "", count: 0, title: "" }] });
    },
    onError: (error) => {
      toast.error(`Error creating stats section: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: StatsFormData) => {
      const { error } = await supabase
        .from("sections")
        .update({ content: data })
        .eq("name", "Stats");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Stats section updated successfully");
      reset({ stats: [{ icon: "", count: 0, title: "" }] });
    },
    onError: (error) => {
      toast.error(`Error updating stats section: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("sections")
        .delete()
        .eq("name", "Stats");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Stats section deleted successfully");
      reset({ stats: [{ icon: "", count: 0, title: "" }] });
    },
    onError: (error) => {
      toast.error(`Error deleting stats section: ${error.message}`);
    },
  });

  const onSubmit = (data: StatsFormData) => {
    if (statsData) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Stats Section Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex space-x-2">
                <Input
                  {...register(`stats.${index}.icon`)}
                  placeholder="Icon"
                />
                <Input
                  {...register(`stats.${index}.count`, { valueAsNumber: true })}
                  type="number"
                  placeholder="Count"
                />
                <Input
                  {...register(`stats.${index}.title`)}
                  placeholder="Title"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            {errors.stats && (
              <p className="text-red-500">{errors.stats.message}</p>
            )}
            <Button
              type="button"
              onClick={() => append({ icon: "", count: 0, title: "" })}
            >
              Add Stat
            </Button>
            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {statsData ? "Update" : "Create"}
              </Button>
              {statsData && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {statsData && (
        <Card>
          <CardHeader>
            <CardTitle>Current Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(statsData?.content as StatsFormData)?.stats?.map(
                (stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold">{stat.count}</div>
                    <div className="text-xl">{stat.title}</div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
