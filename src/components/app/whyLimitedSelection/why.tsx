import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BookProgressionReasons() {
  return (
    <Card className="max-w-3xl mx-auto p-4 md:p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-center font-bold">
          Why Onus Unlocks Books Gradually
        </CardTitle>
        <CardDescription>
          Onus is designed to guide users through Scripture with intention,
          context, and focus — not random verse collection.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 1 */}
        <div>
          <h3 className="font-semibold text-lg">
            1. To Encourage Depth Before Moving Forward
          </h3>
          <p className="text-sm text-muted-foreground">
            Onus requires at least five verses from a book before unlocking the
            next one. This ensures users spend meaningful time in each book
            instead of rushing ahead.
          </p>
        </div>

        <Separator />

        {/* 2 */}
        <div>
          <h3 className="font-semibold text-lg">
            2. To Prevent Random or Selective Reading
          </h3>
          <p className="text-sm text-muted-foreground">
            It’s easy to jump only to familiar or popular passages. This system
            gently guides users to stay focused and engage with Scripture
            thoughtfully.
          </p>
        </div>

        <Separator />

        {/* 3 */}
        <div>
          <h3 className="font-semibold text-lg">
            3. To Preserve Biblical Context
          </h3>
          <p className="text-sm text-muted-foreground">
            Understanding Scripture requires context. Staying within one book
            helps users recognize themes, purpose, and flow before moving on.
          </p>
        </div>

        <Separator />

        {/* 4 */}
        <div>
          <h3 className="font-semibold text-lg">
            4. Why Onus Focuses on Psalms and Proverbs
          </h3>
          <p className="text-sm text-muted-foreground">
            While much of the Old Testament is narrative and story-driven,
            Psalms and Proverbs are rich in short, self-contained passages.
            These books are especially suited for memorization, reflection, and
            daily meditation.
          </p>
        </div>

        <Separator />

        {/* 5 */}
        <div>
          <h3 className="font-semibold text-lg">
            5. Designed for Quotable and Practical Scripture
          </h3>
          <p className="text-sm text-muted-foreground">
            Onus prioritizes verses that can stand on their own and be recalled
            easily. Psalms offers prayerful expression, while Proverbs provides
            practical wisdom for everyday life.
          </p>
        </div>

        <Separator />

        {/* 6 */}
        <div>
          <h3 className="font-semibold text-lg">
            6. To Keep Memorization Purposeful, Not Overwhelming
          </h3>
          <p className="text-sm text-muted-foreground">
            Limiting eligible books helps users focus on quality memorization
            rather than quantity, reducing overload and encouraging consistency.
          </p>
        </div>

        <Separator />

        {/* Summary */}
        <div>
          <p className="font-medium">
            In short: Intentional progression • Contextual understanding •
            Thoughtful memorization • Wisdom and worship-focused books • Growth
            with purpose.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
