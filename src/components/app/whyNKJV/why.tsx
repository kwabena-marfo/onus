import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NIVReasons() {
  return (
    <Card className="max-w-3xl mx-auto p-4 md:p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-center font-bold">
          Why Onus Considers the NIV One of the Best Bible Versions
        </CardTitle>
        <CardDescription>
          A clear and practical explanation of why pastors, teachers, and Bible
          students around the world value the New International Version.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 1 */}
        <div>
          <h3 className="font-semibold text-lg">
            1. Accurate and Faithful to the Original Texts
          </h3>
          <p className="text-sm text-muted-foreground">
            The NIV is translated directly from the best available Hebrew,
            Aramaic, and Greek manuscripts, using modern scholarship to ensure
            accuracy and reliability.
          </p>
        </div>

        <Separator />

        {/* 2 */}
        <div>
          <h3 className="font-semibold text-lg">
            2. Clear, Natural Modern English
          </h3>
          <p className="text-sm text-muted-foreground">
            The NIV uses everyday English, making Scripture easy to understand
            without needing to decode archaic words or sentence structures.
          </p>
        </div>

        <Separator />

        {/* 3 */}
        <div>
          <h3 className="font-semibold text-lg">
            3. Meaning-Based Translation for Better Understanding
          </h3>
          <p className="text-sm text-muted-foreground">
            Rather than translating word-for-word only, the NIV focuses on
            conveying the original meaning clearly, helping readers grasp the
            message as it was intended.
          </p>
        </div>

        <Separator />

        {/* 4 */}
        <div>
          <h3 className="font-semibold text-lg">
            4. Excellent for Study, Teaching, and Devotion
          </h3>
          <p className="text-sm text-muted-foreground">
            Its clarity makes the NIV ideal for personal devotion, group Bible
            study, teaching, and preaching to mixed or new audiences.
          </p>
        </div>

        <Separator />

        {/* 5 */}
        <div>
          <h3 className="font-semibold text-lg">
            5. Great for New and Growing Christians
          </h3>
          <p className="text-sm text-muted-foreground">
            Because it is easy to read and understand, the NIV is often
            recommended for new believers and those building a consistent Bible
            reading habit.
          </p>
        </div>

        <Separator />

        {/* 6 */}
        <div>
          <h3 className="font-semibold text-lg">
            6. Widely Used and Reviewed Internationally
          </h3>
          <p className="text-sm text-muted-foreground">
            The NIV is one of the most widely read Bible translations in the
            world, reviewed and updated by a large team of evangelical scholars.
          </p>
        </div>

        <Separator />

        {/* 7 */}
        <div>
          <h3 className="font-semibold text-lg">
            7. Trusted Across Many Churches
          </h3>
          <p className="text-sm text-muted-foreground">
            Used across denominations and cultures, the NIV works well for
            public reading, teaching, and shared study in diverse church
            settings.
          </p>
        </div>

        <Separator />

        {/* Summary */}
        <div>
          <p className="font-medium">
            In short: Clear • Accurate • Easy to understand • Great for study •
            Ideal for daily reading • Trusted worldwide.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
