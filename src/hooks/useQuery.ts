/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/router";
import useFetchApi from "@/hooks/useFetchApi";
import { queryClient } from "@/lib/utils";

// ---------------- PUBLIC HOOKS ----------------

export function useCreateUserApi() {
  const api = useFetchApi();

  const mutation = useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      clerkId: string;
    }) => {
      const res = await api.post("/api/create-user", userData);
      return res.data;
    },
  });

  return {
    ...mutation,
    trigger: mutation.mutateAsync,
  };
}

// ---------------- PROTECTED HOOKS ----------------

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
      const res = await api.delete(
        `/api/app/delete-onus/?ids=${JSON.stringify(ids)}`
      );
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
      const res = await api.post("/api/app/create-onus-quize", newQuize);
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
