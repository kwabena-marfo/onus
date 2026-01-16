"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/authClient";

import { Suspense, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app/dashboard";

  const { data: sessionData, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (sessionData) router.push(callbackUrl);
  }, [callbackUrl, router, sessionData]);

  return (
    <Suspense>
      <div className="flex flex-col justify-center items-center  z-50">
        <ScrollArea className="max-h-[80vh] py-6 px-4 bg-white border rounded-md">
          <section className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-foreground">
                Privacy Policy for Onus
              </h1>
              <p className="text-xs">Last updated: January 2026</p>
            </div>

            <p>
              Onus is a Bible study and memorization application designed to
              help users store, memorize, and test their knowledge of Bible
              verses through quizzes and learning tools.
            </p>

            <p>
              We respect your privacy and are committed to protecting your
              personal data.
            </p>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Account information (such as name or email address when you
                  sign in)
                </li>
                <li>Authentication data used to keep you securely logged in</li>
                <li>
                  App usage data such as completed quizzes or saved verses
                </li>
              </ul>
              <p>
                We do <span className="font-medium text-foreground">not</span>{" "}
                collect sensitive personal information such as location,
                contacts, or payment details.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Authenticate and manage your account</li>
                <li>Save your memorized verses and quiz progress</li>
                <li>Improve app features and performance</li>
                <li>Maintain security and prevent unauthorized access</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                3. Cookies & Authentication
              </h2>
              <p>
                Onus uses secure cookies and tokens for authentication purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cookies are used on the web to keep you signed in</li>
                <li>Tokens are used on mobile devices for secure API access</li>
              </ul>
              <p>These are strictly for security and session management.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                4. Data Sharing
              </h2>
              <p>
                We do <span className="font-medium text-foreground">not</span>{" "}
                sell, rent, or share your personal data with third parties. Your
                data is only accessed when necessary to provide core app
                functionality.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                5. Data Security
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encrypted authentication sessions</li>
                <li>Secure server communication (HTTPS)</li>
                <li>Restricted access to user data</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                6. Children’s Privacy
              </h2>
              <p>
                Onus does not knowingly collect personal information from
                children under 13. If you believe a child has provided personal
                data, please contact us so we can remove it.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                7. Your Rights
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access your stored data</li>
                <li>Request deletion of your account</li>
                <li>Log out at any time to clear active sessions</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be reflected on this page with an updated revision date.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                9. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or your data,
                please contact us through the app or our official support
                channels.
              </p>
            </div>
          </section>
        </ScrollArea>
      </div>
    </Suspense>
  );
}
