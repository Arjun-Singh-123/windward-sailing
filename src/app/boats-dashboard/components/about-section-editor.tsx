"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const aboutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  title1: z.string().min(1, "Title 1 is required"),
  title2: z.string().min(1, "Title 2 is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Must be a valid URL"),
});

type AboutFormData = z.infer<typeof aboutSchema>;

export default function AboutEditor() {
  const queryClient = useQueryClient();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sections")
        .select("*")
        .eq("name", "About")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: (aboutData?.content as AboutFormData) || {},
  });

  //   const {
  //     register: registerInline,
  //     handleSubmit: handleSubmitInline,
  //     formState: { errors: inlineErrors },
  //     reset: resetInline,
  //   } = useForm<AboutFormData>({
  //     resolver: zodResolver(aboutSchema),
  //     defaultValues: (aboutData?.content as AboutFormData) || {},
  //   });

  const createMutation = useMutation({
    mutationFn: async (data: AboutFormData) => {
      const { error } = await supabase.from("sections").insert({
        name: "About Yachts",
        content: data,
        type: "static",
        display_order: 0,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("About section created successfully");
      reset();
    },
    onError: (error) => {
      toast.error(`Error creating about section: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: AboutFormData) => {
      const { error } = await supabase
        .from("sections")
        .update({ content: data })
        .eq("name", "About");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("About section updated successfully");
      setIsEditing(false);
      reset();
    },
    onError: (error) => {
      toast.error(`Error updating about section: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("sections")
        .delete()
        .eq("name", "About");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });

      toast.success("About section deleted successfully");
      reset();
    },
    onError: (error) => {
      toast.error(`Error deleting about section: ${error.message}`);
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `about-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      if (data?.publicUrl) {
        setValue("image_url", data.publicUrl);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Error uploading image");
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = (data: AboutFormData) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const onInlineSubmit = (data: AboutFormData) => {
    updateMutation.mutate(data);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this about section?")) {
      deleteMutation.mutate();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset(aboutData?.content as AboutFormData);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>About Section Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("title")} placeholder="Title" />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            <Input {...register("subtitle")} placeholder="Subtitle" />
            {errors.subtitle && (
              <p className="text-red-500">{errors.subtitle.message}</p>
            )}

            <Input {...register("title1")} placeholder="Title 1" />
            {errors.title1 && (
              <p className="text-red-500">{errors.title1.message}</p>
            )}

            <Input {...register("title2")} placeholder="Title 2" />
            {errors.title2 && (
              <p className="text-red-500">{errors.title2.message}</p>
            )}

            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            <div>
              <Input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
              {uploadingImage && <p>Uploading image...</p>}
            </div>

            <Input
              {...register("image_url")}
              placeholder="Image URL"
              readOnly
            />
            {errors.image_url && (
              <p className="text-red-500">{errors.image_url.message}</p>
            )}

            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  uploadingImage
                }
              >
                {isEditing ? "Update" : "Create"}
              </Button>
              {aboutData && (
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

      {aboutData && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Current About Section</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleEdit}>
                {isEditing ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
              </Button>
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {aboutData && (
              <div>
                <h2 className="text-2xl font-bold">
                  {(aboutData?.content as AboutFormData)?.title}
                </h2>
                <h3 className="text-xl">
                  {(aboutData?.content as any)?.subtitle}
                </h3>
                <h4 className="text-lg font-semibold">
                  {(aboutData?.content as any)?.title1}
                </h4>
                <h4 className="text-lg font-semibold">
                  {(aboutData?.content as any)?.title2}
                </h4>
                <p>{(aboutData?.content as any)?.description}</p>
                <img
                  src={(aboutData?.content as any)?.image_url}
                  alt="About"
                  className="mt-4 h-64 w-64  "
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
