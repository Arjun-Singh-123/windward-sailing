"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Mail,
  Pencil,
  Trash,
  Check,
  X,
  Upload,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Member = {
  id: string;
  name: string;
  profile_image_url: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  phone: string;
  access: string;
  job_role: string;
  about: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
};

const fetchMembers = async (): Promise<Member[]> => {
  const { data, error } = await supabase.from("members_new").select("*");
  if (error) throw error;
  return data as any;
};

const updateMember = async (member: Partial<Member>): Promise<Member> => {
  const { data, error } = await supabase
    .from("members_new")
    .update(member)
    .eq("id", member.id as string)
    .single();
  if (error) throw error;
  return data;
};

const deleteMember = async (id: string): Promise<void> => {
  const { error } = await supabase.from("members_new").delete().eq("id", id);
  if (error) throw error;
};

const createMember = async (member: Omit<Member, "id">): Promise<Member> => {
  const { data, error } = await supabase
    .from("members_new")
    .insert([member])
    .single();
  if (error) throw error;
  return data;
};

export default function Component() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedMember, setEditedMember] = useState<Partial<Member> | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<Omit<Member, "id">>({
    name: "",
    profile_image_url: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    email: "",
    phone: "",
    access: "",
    job_role: "",
    about: "",
    emergency_contact_name: "",
    emergency_contact_relation: "",
    emergency_contact_phone: "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
    }
  }, []);

  const { data: members, isLoading } = useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  const updateMutation = useMutation({
    mutationFn: updateMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setEditingId(null);
      setEditedMember(null);
      toast.success("Member updated successfully");
    },
    onError: () => {
      toast.error("Failed to update member");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
      toast.success("Member deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete member");
    },
  });

  const createMutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setCreateDialogOpen(false);
      setNewMember({
        name: "",
        profile_image_url: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        email: "",
        phone: "",
        access: "",
        job_role: "",
        about: "",
        emergency_contact_name: "",
        emergency_contact_relation: "",
        emergency_contact_phone: "",
      });
      toast.success("Member created successfully");
    },
    onError: () => {
      toast.error("Failed to create member");
    },
  });

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === members?.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(members?.map((member) => member.id)));
    }
  };

  const handleEmailClick = (email: string, id: string) => {
    if (!selectedRows.has(id)) return;
    window.location.href = `mailto:${email}`;
  };

  const handleEmailClickAll = () => {
    const emails = members
      ?.filter((member) => selectedRows.has(member.id))
      .map((member) => member.email)
      .join(";");
    window.location.href = `mailto:${emails}`;
  };

  const handleEdit = (member: Member) => {
    setEditingId(member.id);
    setEditedMember({ ...member });
  };

  const handleSave = () => {
    if (editedMember) {
      updateMutation.mutate(editedMember);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMember(null);
  };

  const handleDelete = (id: string) => {
    setMemberToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      deleteMutation.mutate(memberToDelete);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    memberId: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `member-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      if (data?.publicUrl) {
        const updatedMember = {
          id: memberId,
          profile_image_url: data.publicUrl,
        };
        updateMutation.mutate(updatedMember);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Error uploading image");
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreate = () => {
    createMutation.mutate(newMember);
  };

  const formatAddress = (member: Member) => {
    const parts = [
      member.address1,
      member.address2,
      member.city,
      member.state,
      member.country,
      member.zipcode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-40">
      <Toaster />
      <div className="flex justify-between items-center mb-6 pr-8">
        <h1 className="text-3xl font-bold ml-4">Members Dashboard</h1>
        <Button
          className="bg-black text-white"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <div className="hidden md:block relative max-h-[800px] overflow-y-auto overflow-x-scroll">
        <Table className="border-collapse border-dashed border-red-500 text-xs p-2">
          <TableHeader className="sticky top-0 bg-white z-10 font-extrabold text-[clamp(12px,2vw,14px)]">
            <TableRow>
              <TableHead className="w-[40px] p-2 text-black border-r border-dotted border-gray-300">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedRows.size === members?.length}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEmailClickAll}
                    disabled={selectedRows.size === 0}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead className="w-[100px] p-2 text-black border-r border-dotted border-gray-300">
                Action
              </TableHead>
              <TableHead className="w-[40px] p-2 text-black border-r border-dotted border-gray-300">
                #
              </TableHead>
              <TableHead className="w-[40px] p-2 text-black border-r border-dotted border-gray-300">
                Profile
              </TableHead>
              <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
                Name
              </TableHead>
              <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
                Address
              </TableHead>
              <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
                Email
              </TableHead>
              <TableHead className="p-2 border-r whitespace-nowrap text-black border-dotted border-gray-300">
                Phone
              </TableHead>
              <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
                Access
              </TableHead>
              <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
                Job Role
              </TableHead>
              <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
                About
              </TableHead>
              <TableHead colSpan={3} className="p-2">
                <div className="space-y-2">
                  <div className="bg-red-500 text-white text-center text-[0.625rem] rounded-t-sm">
                    Emergency Contact Information
                  </div>
                  <div className="grid grid-cols-3 gap-2 pb-4">
                    <div>Name</div>
                    <div>Relation</div>
                    <div>Contact</div>
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member, index) => (
              <TableRow
                key={member.id}
                className="border-b odd:bg-gray-100 even:bg-white"
              >
                <TableCell className="p-2 border-r border-dotted border-gray-300">
                  <Checkbox
                    checked={selectedRows.has(member.id)}
                    onCheckedChange={() => toggleRow(member.id)}
                    aria-label={`Select ${member.name}`}
                  />
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEmailClick(member.email, member.id)}
                      disabled={!selectedRows.has(member.id)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    {editingId === member.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={handleSave}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(member)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300">
                  {index + 1}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={member?.profile_image_url ?? ""}
                        alt={member.name}
                      />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {editingId === member.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <label
                          htmlFor={`image-upload-${member.id}`}
                          className="cursor-pointer"
                        >
                          <Upload className="h-6 w-6 text-white" />
                        </label>
                        <input
                          id={`image-upload-${member.id}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, member.id)}
                          disabled={uploadingImage}
                        />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.name || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member.name
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300">
                  {editingId === member.id ? (
                    <>
                      <Input
                        value={editedMember?.address1 || ""}
                        onChange={(e) =>
                          setEditedMember({
                            ...editedMember,
                            address1: e.target.value,
                          })
                        }
                        placeholder="Address 1"
                        className="mb-2"
                      />
                      <Input
                        value={editedMember?.address2 || ""}
                        onChange={(e) =>
                          setEditedMember({
                            ...editedMember,
                            address2: e.target.value,
                          })
                        }
                        placeholder="Address 2"
                        className="mb-2"
                      />
                      <Input
                        value={editedMember?.city || ""}
                        onChange={(e) =>
                          setEditedMember({
                            ...editedMember,
                            city: e.target.value,
                          })
                        }
                        placeholder="City"
                        className="mb-2"
                      />
                      <Input
                        value={editedMember?.state || ""}
                        onChange={(e) =>
                          setEditedMember({
                            ...editedMember,
                            state: e.target.value,
                          })
                        }
                        placeholder="State"
                        className="mb-2"
                      />
                      <Input
                        value={editedMember?.country || ""}
                        onChange={(e) =>
                          setEditedMember({
                            ...editedMember,
                            country: e.target.value,
                          })
                        }
                        placeholder="Country"
                        className="mb-2"
                      />
                      <Input
                        value={editedMember?.zipcode || ""}
                        onChange={(e) =>
                          setEditedMember({
                            ...editedMember,
                            zipcode: e.target.value,
                          })
                        }
                        placeholder="Zipcode"
                      />
                    </>
                  ) : (
                    formatAddress(member)
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.email || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member.email
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.phone || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member.phone
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300 ">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.access || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          access: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member.access
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.job_role || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          job_role: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member?.job_role
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.about || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          about: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member.about
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300 text-center">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.emergency_contact_name || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          emergency_contact_name: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  ) : (
                    member.emergency_contact_name
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300 text-center">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.emergency_contact_relation || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          emergency_contact_relation: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  ) : (
                    member.emergency_contact_relation
                  )}
                </TableCell>
                <TableCell className="p-2 border-r border-dotted border-gray-300 text-center whitespace-nowrap">
                  {editingId === member.id ? (
                    <Input
                      value={editedMember?.emergency_contact_phone || ""}
                      onChange={(e) =>
                        setEditedMember({
                          ...editedMember,
                          emergency_contact_phone: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  ) : (
                    member.emergency_contact_phone
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {members?.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                {member.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex pl-3  gap-4 items-center mb-2">
                <div>
                  <p className="text-sm text-gray-500">Email: {member.email}</p>
                  <p className="text-sm text-gray-500">Phone: {member.phone}</p>
                </div>
                <Checkbox
                  className="mb-4"
                  checked={selectedRows.has(member.id)}
                  onCheckedChange={() => toggleRow(member.id)}
                  aria-label={`Select ${member.name}`}
                />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmailClick(member.email, member.id)}
                  disabled={!selectedRows.has(member.id)}
                >
                  <Mail className="h-4 w-4 mr-1" /> Email
                </Button>
                {editingId === member.id ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSave}>
                      <Check className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
              {editingId === member.id ? (
                <div className="mt-4 space-y-2">
                  <Input
                    value={editedMember?.name || ""}
                    onChange={(e) =>
                      setEditedMember({ ...editedMember, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                  <Input
                    value={editedMember?.email || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email"
                  />
                  <Input
                    value={editedMember?.phone || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone"
                  />
                  <Input
                    value={editedMember?.access || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        access: e.target.value,
                      })
                    }
                    placeholder="Access"
                  />
                  <Input
                    value={editedMember?.job_role || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        job_role: e.target.value,
                      })
                    }
                    placeholder="Job Role"
                  />
                  <Textarea
                    value={editedMember?.about || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        about: e.target.value,
                      })
                    }
                    placeholder="About"
                  />
                  <Input
                    value={editedMember?.address1 || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        address1: e.target.value,
                      })
                    }
                    placeholder="Address 1"
                  />
                  <Input
                    value={editedMember?.address2 || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        address2: e.target.value,
                      })
                    }
                    placeholder="Address 2"
                  />
                  <Input
                    value={editedMember?.city || ""}
                    onChange={(e) =>
                      setEditedMember({ ...editedMember, city: e.target.value })
                    }
                    placeholder="City"
                  />
                  <Input
                    value={editedMember?.state || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        state: e.target.value,
                      })
                    }
                    placeholder="State"
                  />
                  <Input
                    value={editedMember?.country || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        country: e.target.value,
                      })
                    }
                    placeholder="Country"
                  />
                  <Input
                    value={editedMember?.zipcode || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        zipcode: e.target.value,
                      })
                    }
                    placeholder="Zipcode"
                  />
                  <Input
                    value={editedMember?.emergency_contact_name || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        emergency_contact_name: e.target.value,
                      })
                    }
                    placeholder="Emergency Contact Name"
                  />
                  <Input
                    value={editedMember?.emergency_contact_relation || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        emergency_contact_relation: e.target.value,
                      })
                    }
                    placeholder="Emergency Contact Relation"
                  />
                  <Input
                    value={editedMember?.emergency_contact_phone || ""}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        emergency_contact_phone: e.target.value,
                      })
                    }
                    placeholder="Emergency Contact Phone"
                  />
                </div>
              ) : expandedMember === member.id ? (
                <div className="mt-4 space-y-2">
                  <p className="text-sm">
                    <strong>Address:</strong> {formatAddress(member)}
                  </p>
                  <p className="text-sm">
                    <strong>Access:</strong> {member.access}
                  </p>
                  <p className="text-sm">
                    <strong>Job Role:</strong> {member.job_role}
                  </p>
                  <p className="text-sm">
                    <strong>About:</strong> {member.about}
                  </p>
                  <div>
                    <p className="text-sm font-semibold">Emergency Contact:</p>
                    <p className="text-sm">
                      {member.emergency_contact_name} (
                      {member.emergency_contact_relation})
                    </p>
                    <p className="text-sm">{member.emergency_contact_phone}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedMember(null)}
                    className="w-full mt-2"
                  >
                    <ChevronDown className="h-4 w-4 mr-1" /> Show Less
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedMember(member.id)}
                  className="w-full mt-2"
                >
                  <ChevronDown className="h-4 w-4 mr-1" /> Show More
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {deleteMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Member</DialogTitle>
            <DialogDescription>
              Enter the details for the new member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Phone
              </label>
              <Input
                id="phone"
                value={newMember.phone}
                onChange={(e) =>
                  setNewMember({ ...newMember, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="access" className="text-right">
                Access
              </label>
              <Input
                id="access"
                value={newMember.access}
                onChange={(e) =>
                  setNewMember({ ...newMember, access: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="jobRole" className="text-right">
                Job Role
              </label>
              <Input
                id="jobRole"
                value={newMember.job_role}
                onChange={(e) =>
                  setNewMember({ ...newMember, job_role: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="about" className="text-right">
                About
              </label>
              <Textarea
                id="about"
                value={newMember.about}
                onChange={(e) =>
                  setNewMember({ ...newMember, about: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Address</h4>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="address1" className="text-right">
                  Address 1
                </label>
                <Input
                  id="address1"
                  value={newMember.address1}
                  onChange={(e) =>
                    setNewMember({ ...newMember, address1: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-2">
                <label htmlFor="address2" className="text-right">
                  Address 2
                </label>
                <Input
                  id="address2"
                  value={newMember.address2}
                  onChange={(e) =>
                    setNewMember({ ...newMember, address2: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-2">
                <label htmlFor="city" className="text-right">
                  City
                </label>
                <Input
                  id="city"
                  value={newMember.city}
                  onChange={(e) =>
                    setNewMember({ ...newMember, city: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-2">
                <label htmlFor="state" className="text-right">
                  State
                </label>
                <Input
                  id="state"
                  value={newMember.state}
                  onChange={(e) =>
                    setNewMember({ ...newMember, state: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-2">
                <label htmlFor="zipcode" className="text-right">
                  Zipcode
                </label>
                <Input
                  id="zipcode"
                  value={newMember.zipcode}
                  onChange={(e) =>
                    setNewMember({ ...newMember, zipcode: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-2">
                <label htmlFor="country" className="text-right">
                  Country
                </label>
                <Input
                  id="country"
                  value={newMember.country}
                  onChange={(e) =>
                    setNewMember({ ...newMember, country: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Emergency Contact</h4>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="emergency_contact_name" className="text-right">
                  Name
                </label>
                <Input
                  id="emergency_contact_name"
                  value={newMember.emergency_contact_name}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      emergency_contact_name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-2">
                <label
                  htmlFor="emergency_contact_relation"
                  className="text-right"
                >
                  Relation
                </label>
                <Input
                  id="emergency_contact_relation"
                  value={newMember.emergency_contact_relation}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      emergency_contact_relation: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-2">
                <label htmlFor="emergency_contact_phone" className="text-right">
                  Contact
                </label>
                <Input
                  id="emergency_contact_phone"
                  value={newMember.emergency_contact_phone}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      emergency_contact_phone: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="destructive"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              {createMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   Loader2,
//   Mail,
//   Pencil,
//   Trash,
//   Check,
//   X,
//   Upload,
//   Plus,
// } from "lucide-react";
// import { toast, Toaster } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Controller } from "react-hook-form";
// import { supabase } from "@/lib/supabase";

// type Member = {
//   id: string;
//   name: string;
//   profile_image_url: string;
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   zipcode: string;
//   country: string;
//   email: string;
//   phone: string;
//   access: string;
//   job_role: string;
//   about: string;
//   emergency_contact_name: string; // Matches database field
//   emergency_contact_relation: string; // Matches database field
//   emergency_contact_phone: string; // Matches database field
// };
// // const mapMemberToDB = (member: Member) => ({
// //   name: member.name,
// //   profile_image_url: member.profile_image_url,
// //   address1: member.address1,
// //   address2: member.address2,
// //   city: member.city,
// //   state: member.state,
// //   zipcode: member.zipcode,
// //   country: member.country,
// //   email: member.email,
// //   phone: member.phone,
// //   access: member.access,
// //   job_role: member.jobRole,
// //   about: member.about,
// //   emergency_contact_name: member.emergencyContact.name,
// //   emergency_contact_relation: member.emergencyContact.relation,
// //   emergency_contact_phone: member.emergencyContact.contact,
// // });

// const fetchMembers = async (): Promise<Member[]> => {
//   const { data, error } = await supabase.from("members_new").select("*");
//   if (error) throw error;
//   return data as any;
// };

// const updateMember = async (member: Partial<Member>): Promise<Member> => {
//   const { data, error } = await supabase
//     .from("members_new")
//     .update(member)
//     .eq("id", member.id as string)
//     .single();
//   if (error) throw error;
//   return data;
// };

// const deleteMember = async (id: string): Promise<void> => {
//   const { error } = await supabase.from("members_new").delete().eq("id", id);
//   if (error) throw error;
// };

// const createMember = async (member: Omit<Member, "id">): Promise<Member> => {
//   const { data, error } = await supabase
//     .from("members_new")
//     .insert([member])
//     .single();
//   if (error) throw error;
//   return data;
// };

// export default function Component() {
//   const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editedMember, setEditedMember] = useState<Partial<Member> | null>(
//     null
//   );
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [createDialogOpen, setCreateDialogOpen] = useState(false);
//   const [newMember, setNewMember] = useState<Omit<Member, "id">>({
//     name: "",
//     profile_image_url: "",
//     address1: "",
//     address2: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     email: "",
//     phone: "",
//     access: "",
//     job_role: "",
//     about: "",
//     emergency_contact_name: "", // Flat structure
//     emergency_contact_relation: "", // Flat structure
//     emergency_contact_phone: "", // Flat structure
//   });

//   const queryClient = useQueryClient();

//   const { data: members, isLoading } = useQuery<Member[]>({
//     queryKey: ["members"],
//     queryFn: fetchMembers,
//   });

//   const updateMutation = useMutation({
//     mutationFn: updateMember,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["members"] });
//       setEditingId(null);
//       setEditedMember(null);
//       toast.success("Member updated successfully");
//     },
//     onError: () => {
//       toast.error("Failed to update member");
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteMember,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["members"] });
//       setDeleteDialogOpen(false);
//       setMemberToDelete(null);
//       toast.success("Member deleted successfully");
//     },
//     onError: () => {
//       toast.error("Failed to delete member");
//     },
//   });

//   const createMutation = useMutation({
//     mutationFn: createMember,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["members"] });
//       setCreateDialogOpen(false);
//       setNewMember({
//         name: "",
//         profile_image_url: "",
//         address1: "",
//         address2: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         country: "",
//         email: "",
//         phone: "",
//         access: "",
//         job_role: "",
//         about: "",
//         emergency_contact_name: "", // Flat structure
//         emergency_contact_relation: "", // Flat structure
//         emergency_contact_phone: "", // Flat structure
//       });
//       toast.success("Member created successfully");
//     },
//     onError: () => {
//       toast.error("Failed to create member");
//     },
//   });

//   const toggleRow = (id: string) => {
//     const newSelected = new Set(selectedRows);
//     if (newSelected.has(id)) {
//       newSelected.delete(id);
//     } else {
//       newSelected.add(id);
//     }
//     setSelectedRows(newSelected);
//   };

//   const toggleAll = () => {
//     if (selectedRows.size === members?.length) {
//       setSelectedRows(new Set());
//     } else {
//       setSelectedRows(new Set(members?.map((member) => member.id)));
//     }
//   };

//   const handleEmailClick = (email: string, id: string) => {
//     if (!selectedRows.has(id)) return;
//     window.location.href = `mailto:${email}`;
//   };

//   const handleEmailClickAll = () => {
//     const emails = members
//       ?.filter((member) => selectedRows.has(member.id))
//       .map((member) => member.email)
//       .join(";");
//     window.location.href = `mailto:${emails}`;
//   };

//   const handleEdit = (member: Member) => {
//     setEditingId(member.id);
//     setEditedMember({ ...member });
//   };

//   const handleSave = () => {
//     if (editedMember) {
//       updateMutation.mutate(editedMember);
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditedMember(null);
//   };

//   const handleDelete = (id: string) => {
//     setMemberToDelete(id);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = () => {
//     if (memberToDelete) {
//       deleteMutation.mutate(memberToDelete);
//     }
//   };

//   const handleImageUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>,
//     memberId: string
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setUploadingImage(true);
//     try {
//       const fileExt = file.name.split(".").pop();
//       const fileName = `${Math.random()}.${fileExt}`;
//       const filePath = `member-images/${fileName}`;

//       const { error: uploadError } = await supabase.storage
//         .from("images")
//         .upload(filePath, file);

//       if (uploadError) {
//         throw uploadError;
//       }

//       const { data } = supabase.storage.from("images").getPublicUrl(filePath);

//       if (data?.publicUrl) {
//         const updatedMember = { id: memberId, profileImage: data.publicUrl };
//         updateMutation.mutate(updatedMember);
//         toast.success("Image uploaded successfully");
//       }
//     } catch (error) {
//       toast.error("Error uploading image");
//       console.error("Error uploading image:", error);
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleCreate = () => {
//     console.log(newMember);

//     createMutation.mutate(newMember);
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="  pt-40">
//       <Toaster />
//       <div className="flex justify-between items-center mb-6  pr-8">
//         <h1 className="text-3xl font-bold ml-4">Members Dashboard</h1>
//         <Button
//           className="bg-black text-white"
//           onClick={() => setCreateDialogOpen(true)}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Member
//         </Button>
//       </div>
//       <div className="relative max-h-[800px] overflow-y-auto overflow-x-scroll">
//         <Table className="border-collapse border-dashed border-red-500 text-xs p-2">
//           <TableHeader className="sticky top-0 bg-white z-10 font-extrabold text-[clamp(12px,2vw,14px)]">
//             <TableRow>
//               <TableHead className="w-[40px] p-2 text-black border-r border-dotted border-gray-300">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     checked={selectedRows.size === members?.length}
//                     onCheckedChange={toggleAll}
//                     aria-label="Select all"
//                   />
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={handleEmailClickAll}
//                     disabled={selectedRows.size === 0}
//                   >
//                     <Mail className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </TableHead>
//               <TableHead className="w-[100px] p-2 text-black border-r border-dotted border-gray-300">
//                 Action
//               </TableHead>
//               <TableHead className="w-[40px] p-2 text-black border-r border-dotted border-gray-300">
//                 #
//               </TableHead>
//               <TableHead className="w-[40px] p-2 text-black border-r border-dotted border-gray-300">
//                 Profile
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Name
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Address1
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Address2
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 City
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 State
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Zipcode
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Country
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Email
//               </TableHead>
//               <TableHead className="p-2 border-r whitespace-nowrap text-black border-dotted border-gray-300">
//                 Phone
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Access
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 Job Role
//               </TableHead>
//               <TableHead className="p-2 border-r text-black border-dotted border-gray-300">
//                 About
//               </TableHead>
//               <TableHead colSpan={3} className="p-2">
//                 <div className="space-y-2">
//                   <div className="bg-red-500 text-white text-center text-[0.625rem] rounded-t-sm">
//                     Emergency Contact Information
//                   </div>
//                   <div className="grid grid-cols-3 gap-2 pb-4">
//                     <div>Name</div>
//                     <div>Relation</div>
//                     <div>Contact</div>
//                   </div>
//                 </div>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {members &&
//               members?.map((member, index) => (
//                 <TableRow
//                   key={member.id}
//                   className="border-b odd:bg-gray-100 even:bg-white"
//                 >
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     <Checkbox
//                       checked={selectedRows.has(member.id)}
//                       onCheckedChange={() => toggleRow(member.id)}
//                       aria-label={`Select ${member.name}`}
//                     />
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     <div className="flex items-center">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8"
//                         onClick={() =>
//                           handleEmailClick(member.email, member.id)
//                         }
//                         disabled={!selectedRows.has(member.id)}
//                       >
//                         <Mail className="h-4 w-4" />
//                       </Button>
//                       {editingId === member.id ? (
//                         <>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={handleSave}
//                           >
//                             <Check className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={handleCancel}
//                           >
//                             <X className="h-4 w-4" />
//                           </Button>
//                         </>
//                       ) : (
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-8 w-8"
//                           onClick={() => handleEdit(member)}
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                       )}
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         className="h-8 w-8"
//                         onClick={() => handleDelete(member.id)}
//                       >
//                         <Trash className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     {index + 1}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     <div className="relative">
//                       <Avatar className="h-12 w-12">
//                         <AvatarImage
//                           src={member?.profile_image_url ?? ""}
//                           alt={member.name}
//                         />
//                         <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       {editingId === member.id && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//                           <label
//                             htmlFor={`image-upload-${member.id}`}
//                             className="cursor-pointer"
//                           >
//                             <Upload className="h-6 w-6 text-white" />
//                           </label>
//                           <input
//                             id={`image-upload-${member.id}`}
//                             type="file"
//                             accept="image/*"
//                             className="hidden"
//                             onChange={(e) => handleImageUpload(e, member.id)}
//                             disabled={uploadingImage}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.name || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             name: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.name
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     {editingId === member.id ? (
//                       <Textarea
//                         value={editedMember?.address1 || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             address1: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.address1
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.address2 || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             address2: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.address2
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.city || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             city: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.city
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.state || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             state: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.state
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.zipcode || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             zipcode: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.zipcode
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.country || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             country: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.country
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.email || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             email: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.email
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.phone || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             phone: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.phone
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 ">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.access || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             access: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.access
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.job_role || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             job_role: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member?.job_role
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.about || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             about: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       member.about
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 text-center">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.emergency_contact_name || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             emergency_contact_name: e.target.value,
//                           })
//                         }
//                         className="w-full"
//                       />
//                     ) : (
//                       member.emergency_contact_name
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 text-center">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.emergency_contact_relation || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             emergency_contact_relation: e.target.value,
//                           })
//                         }
//                         className="w-full"
//                       />
//                     ) : (
//                       member.emergency_contact_relation
//                     )}
//                   </TableCell>
//                   <TableCell className="p-2 border-r border-dotted border-gray-300 text-center whitespace-nowrap">
//                     {editingId === member.id ? (
//                       <Input
//                         value={editedMember?.emergency_contact_phone || ""}
//                         onChange={(e) =>
//                           setEditedMember({
//                             ...editedMember,
//                             emergency_contact_phone: e.target.value,
//                           })
//                         }
//                         className="w-full"
//                       />
//                     ) : (
//                       member.emergency_contact_phone
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </div>

//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this member? This action cannot be
//               undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={confirmDelete}>
//               {deleteMutation.isPending ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 "Delete"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
//         <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Create New Member</DialogTitle>
//             <DialogDescription>
//               Enter the details for the new member.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="flex items-center gap-4">
//               <label htmlFor="profileImage" className="w-24 text-right">
//                 Profile Image
//               </label>
//               <div className="flex-1 flex items-center gap-4">
//                 <Avatar className="h-20 w-20">
//                   <AvatarImage
//                     src={newMember?.profile_image_url ?? ""}
//                     alt={newMember.name}
//                   />
//                   <AvatarFallback>
//                     {newMember.name?.charAt(0) || "N"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <label htmlFor="image-upload" className="cursor-pointer">
//                   <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
//                     <Upload className="h-4 w-4" />
//                     Upload Image
//                   </div>
//                 </label>
//                 <input
//                   id="image-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={async (e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       const fileExt = file.name.split(".").pop();
//                       const fileName = `${Math.random()}.${fileExt}`;
//                       const filePath = `member-images/${fileName}`;

//                       try {
//                         const { error: uploadError } = await supabase.storage
//                           .from("images")
//                           .upload(filePath, file);

//                         if (uploadError) {
//                           throw uploadError;
//                         }

//                         const { data } = supabase.storage
//                           .from("images")
//                           .getPublicUrl(filePath);

//                         if (data?.publicUrl) {
//                           setNewMember({
//                             ...newMember,
//                             profile_image_url: data.publicUrl,
//                           });
//                           toast.success("Image uploaded successfully");
//                         }
//                       } catch (error) {
//                         toast.error("Error uploading image");
//                         console.error("Error uploading image:", error);
//                       }
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="name" className="text-right">
//                 Name
//               </label>
//               <Input
//                 id="name"
//                 value={newMember.name}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, name: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="email" className="text-right">
//                 Email
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={newMember.email}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, email: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="address1" className="text-right">
//                 Address 1
//               </label>
//               <Input
//                 id="address1"
//                 value={newMember.address1}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, address1: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="address2" className="text-right">
//                 Address 2
//               </label>
//               <Input
//                 id="address2"
//                 value={newMember.address2}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, address2: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="city" className="text-right">
//                 City
//               </label>
//               <Input
//                 id="city"
//                 value={newMember.city}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, city: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="state" className="text-right">
//                 State
//               </label>
//               <Input
//                 id="state"
//                 value={newMember.state}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, state: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="zipcode" className="text-right">
//                 Zipcode
//               </label>
//               <Input
//                 id="zipcode"
//                 value={newMember.zipcode}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, zipcode: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="country" className="text-right">
//                 Country
//               </label>
//               <Input
//                 id="country"
//                 value={newMember.country}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, country: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="phone" className="text-right">
//                 Phone
//               </label>
//               <Input
//                 id="phone"
//                 value={newMember.phone}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, phone: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="access" className="text-right">
//                 Access
//               </label>
//               <Input
//                 id="access"
//                 value={newMember.access}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, access: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="jobRole" className="text-right">
//                 Job Role
//               </label>
//               <Input
//                 id="jobRole"
//                 value={newMember.job_role}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, job_role: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="about" className="text-right">
//                 About
//               </label>
//               <Textarea
//                 id="about"
//                 value={newMember.about}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, about: e.target.value })
//                 }
//                 className="col-span-3"
//               />
//             </div>
//             <div className="border-t pt-4 mt-4">
//               <h4 className="font-medium mb-2">Emergency Contact</h4>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <label htmlFor="emergency_contact_name" className="text-right">
//                   Name
//                 </label>
//                 <Input
//                   id="emergency_contact_name"
//                   value={newMember.emergency_contact_name}
//                   onChange={(e) =>
//                     setNewMember({
//                       ...newMember,
//                       emergency_contact_name: e.target.value,
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4 mt-2">
//                 <label
//                   htmlFor="emergency_contact_relation"
//                   className="text-right"
//                 >
//                   Relation
//                 </label>
//                 <Input
//                   id="emergency_contact_relation"
//                   value={newMember.emergency_contact_relation}
//                   onChange={(e) =>
//                     setNewMember({
//                       ...newMember,
//                       emergency_contact_relation: e.target.value,
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4 mt-2">
//                 <label htmlFor="emergency_contact_phone" className="text-right">
//                   Contact
//                 </label>
//                 <Input
//                   id="emergency_contact_phone"
//                   value={newMember.emergency_contact_phone}
//                   onChange={(e) =>
//                     setNewMember({
//                       ...newMember,
//                       emergency_contact_phone: e.target.value,
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setCreateDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleCreate}>
//               {createMutation.isPending ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 "Create"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
