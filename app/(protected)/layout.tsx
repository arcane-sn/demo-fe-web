"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/auth-provider";
import { ScreenLoader } from "@/components/common/screen-loader";
import { Demo1Layout } from "../components/layouts/demo1/layout";
import { httpService, errorService } from "@/services";
import { toast } from "sonner";
import ModalNotif from "@/components/ui/modal-notif";
import { useAppStore } from "@/stores";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Initialize Zustand store
  const {
    globalModal,
    setGlobalModalOpen,
    setGlobalModalTitle,
    setGlobalModalSubTitle,
    setGlobalModalMessage,
    setGlobalModalImage,
  } = useAppStore();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    // Initialize service layer when user is authenticated
    if (status === "authenticated") {
      // Configure error handling
      setupErrorHandling();

      // Configure HTTP service
      setupHttpService();

      // Initialize Zustand store
      initializeAppStore();

      console.log("Service layer initialized");
    }
  }, [status, session]);

  // Initialize app store
  const initializeAppStore = () => {
    // Set up global modal defaults
    setGlobalModalTitle("Notification");
    setGlobalModalSubTitle("");
    setGlobalModalMessage("");
    setGlobalModalImage("");
    console.log("Zustand store initialized");
  };

  // Setup error handling
  const setupErrorHandling = () => {
    // Set up notification callback (integrate with your toast system)
    errorService.setNotificationCallback((notification) => {
      if (notification.type === "error") {
        toast.error(notification.message, {
          duration: notification.duration,
          id: notification.title,
        });
      } else if (notification.type === "warning") {
        toast.warning(notification.message, {
          duration: notification.duration,
          id: notification.title,
        });
      } else {
        toast.info(notification.message, {
          duration: notification.duration,
          id: notification.title,
        });
      }
    });
  };

  // Setup HTTP service
  const setupHttpService = () => {
    // Set base URL from environment
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    if (baseURL) {
      httpService.setBaseURL(baseURL);
    }

    // Configure with credentials for HttpOnly cookies
    httpService.getClient().defaults.withCredentials = true;
  };

  if (status === "loading") {
    return <ScreenLoader />;
  }

  return session ? (
    <Demo1Layout>
      {children}
      <ModalNotif
        open={globalModal.open}
        onOpenChange={() => setGlobalModalOpen(!globalModal.open)}
        title={globalModal.title}
        subTitle={globalModal.subTitle}
        message={globalModal.message}
        image={globalModal.image}
      />
    </Demo1Layout>
  ) : null;
}
