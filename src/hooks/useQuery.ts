/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchApi from "@/hooks/useFetchApi";
import { queryClient } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ---------------- PUBLIC HOOKS ----------------

export function useFetchVersesApi() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/api/app/get-verses", data);
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["fetchVerses"] }),
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function usePostVerse() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (newVerse: any) => {
      const res = await api.post("/api/app/create-onus", newVerse);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getVerses"] }),
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function useGetVerses() {
  const api = useFetchApi();

  return useQuery({
    queryKey: ["getVerses"],
    queryFn: async () => {
      const res = await api.get("/api/app/get-onus");
      return res.data;
    },
  });
}

export function useDeleteVerse() {
  const api = useFetchApi();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await api.delete(`/api/app/delete-onus/?id=${ids}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Verse removed successfully.");
      queryClient.invalidateQueries({ queryKey: ["getVerses"] });
      router.back();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete verse.");
    },
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function usePostOnusQuize() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (newQuize: any) => {
      const res = await api.post("/api/app/create-quiz-batch", newQuize);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOnusQuizes"] });
    },
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function useGetQuizzes() {
  const api = useFetchApi();

  return useQuery({
    queryKey: ["getQuizzes"],
    queryFn: async () => {
      const res = await api.get("/api/app/get-onus-quize");
      return res.data;
    },
  });
}

export function useGetAddedQuizzes() {
  const api = useFetchApi();

  return useQuery({
    queryKey: ["added-quizzes"],
    queryFn: async () => {
      const res = await api.get("/api/app/get-added-quizzes");
      return res.data;
    },
  });
}

export function useUpdateQuiz(id: string) {
  const api = useFetchApi();

  return useMutation({
    mutationFn: (data: any) => api.put(`/app/update-quiz/${id}`, data),
  });
}

// ---------------- UPDATE ACCOUNT ----------------

export function useUpdateProfile() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (data: { fullName: string }) => {
      const res = await api.patch("/api/user/profile", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile");
    },
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function useChangePassword() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const res = await api.post("/api/user/change-password", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to change password");
    },
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function usePostOnusQuiz() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (newQuiz: any) => {
      const res = await api.post("/api/app/create-quiz", newQuiz);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getOnusQuizzes"],
      });
    },
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function useGetOnusQuizzes(book: string) {
  const api = useFetchApi();

  const query = useQuery({
    queryKey: ["getOnusQuizzes"],
    queryFn: async () => {
      const res = await api.get(`/api/app/get-quiz/${book}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return query;
}
