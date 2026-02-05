/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchApi from "@/hooks/useFetchApi";
import { queryClient } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ---------------- VERSES ----------------
export function useFetchVersesApi() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/api/verses/get-verses", data);
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
      const res = await api.post("/api/verses/create-onus", newVerse);
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
      const res = await api.get("/api/verses/get-onus");
      return res.data;
    },
  });
}

export function useDeleteVerse() {
  const api = useFetchApi();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/verses/delete-onus/?id=${id}`);
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

// ---------------- QUIZZES ----------------
export function usePostOnusQuiz() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (quizAttempt: {
      quizName: string;
      score: number;
      total: number;
    }) => {
      const res = await api.post("/api/quizzes/create-onus-quize", quizAttempt);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Quiz saved successfully");
      queryClient.invalidateQueries({ queryKey: ["getOnusQuizzes"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to save quiz");
    },
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function usePostOnusQuizBatch() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (newQuizzes: any) => {
      const res = await api.post("/api/quizzes/create-quiz-batch", newQuizzes);
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getOnusQuizzes"] }),
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function useCreateOnusQuiz() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (newQuiz: any) => {
      const res = await api.post("/api/quizzes/create-quiz", newQuiz);
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getOnusQuizzes"] }),
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function useUpdateQuiz(id: string) {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: (data: any) => api.put(`/api/quizzes/update-quiz/${id}`, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getOnusQuizzes"] }),
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

export function useGetQuizzes() {
  const api = useFetchApi();

  return useQuery({
    queryKey: ["getOnusQuizzes"],
    queryFn: async () => {
      const res = await api.get("/api/quizzes/get-onus-quize");
      return res.data;
    },
  });
}

export function useGetAddedQuizzes() {
  const api = useFetchApi();

  return useQuery({
    queryKey: ["addedQuizzes"],
    queryFn: async () => {
      const res = await api.get("/api/quizzes/get-added-quizzes");
      return res.data;
    },
  });
}

export function useGetOnusQuiz(book: string) {
  const api = useFetchApi();

  return useQuery({
    queryKey: ["getOnusQuiz", book],
    queryFn: async () => {
      const res = await api.get(`/api/quizzes/get-quiz/${book}`);
      return res.data;
    },
    enabled: !!book,
  });
}

export function useGetRawOnusQuiz(book: string) {
  const api = useFetchApi();

  return useQuery({
    queryKey: ["rawOnusQuiz", book],
    queryFn: async () => {
      const res = await api.get(`/api/quizzes/get-quiz-raw/${book}`);
      return res.data;
    },
    enabled: !!book,
  });
}

// ---------------- PROFILE ----------------
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
    onSuccess: () => toast.success("Password changed successfully"),
    onError: (error: any) =>
      toast.error(error?.message || "Failed to change password"),
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}
