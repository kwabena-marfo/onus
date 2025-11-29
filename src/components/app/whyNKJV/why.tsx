import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NKJVReasons() {
  return (
    <Card className="max-w-3xl mx-auto p-4 md:p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-center font-bold ">
          Why Onus Considers the NKJV One of the Best Bible Versions
        </CardTitle>
        <CardDescription>
          A simple, balanced explanation of why pastors, teachers, and Bible
          students appreciate the New King James Version.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 1 */}
        <div>
          <h3 className="font-semibold text-lg">
            1. Faithful to the Original Texts
          </h3>
          <p className="text-sm text-muted-foreground">
            The NKJV stays close to the <strong>Textus Receptus</strong>, the
            same manuscript base as the KJV, which many find reliable and
            historically trusted.
          </p>
        </div>

        <Separator />

        {/* 2 */}
        <div>
          <h3 className="font-semibold text-lg">
            2. Modern English Without Losing the Majesty
          </h3>
          <p className="text-sm text-muted-foreground">
            Older words like <em>thee, thou, thy</em> are removed for clarity,
            but the NKJV still maintains the classic “Bible sound.”
          </p>
        </div>

        <Separator />

        {/* 3 */}
        <div>
          <h3 className="font-semibold text-lg">
            3. Balanced: Accurate and Readable
          </h3>
          <p className="text-sm text-muted-foreground">
            NKJV strikes a perfect balance — accurate enough for deep study, yet
            smooth and readable for everyday devotion.
          </p>
        </div>

        <Separator />

        {/* 4 */}
        <div>
          <h3 className="font-semibold text-lg">
            4. Great for Sermons, Study, and Memorization
          </h3>
          <p className="text-sm text-muted-foreground">
            Its consistent, poetic wording makes it excellent for preaching,
            teaching, and remembering Scripture.
          </p>
        </div>

        <Separator />

        {/* 5 */}
        <div>
          <h3 className="font-semibold text-lg">
            5. Easy Transition from the KJV
          </h3>
          <p className="text-sm text-muted-foreground">
            If you grew up on the KJV, the NKJV feels familiar but easier to
            understand — classic verses still feel like classic verses.
          </p>
        </div>

        <Separator />

        {/* 6 */}
        <div>
          <h3 className="font-semibold text-lg">
            6. Minimal Interpretive Bias
          </h3>
          <p className="text-sm text-muted-foreground">
            The NKJV updates language but avoids adding interpretation, keeping
            meaning as close as possible to the originals.
          </p>
        </div>

        <Separator />

        {/* 7 */}
        <div>
          <h3 className="font-semibold text-lg">
            7. Widely Trusted by Many Churches
          </h3>
          <p className="text-sm text-muted-foreground">
            The NKJV is accepted across many denominations — Pentecostal,
            Baptist, evangelical, charismatic — making it great for public
            reading and teaching.
          </p>
        </div>

        <Separator />

        {/* Summary */}
        <div>
          <p className="font-medium">
            In short: Accurate • Clear • Beautiful • Easy to memorize • Trusted
            • Modern without changing the meaning.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
