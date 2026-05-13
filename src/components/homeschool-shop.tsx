import { useState } from "react";
import { Star, ShoppingCart, GraduationCap, BookOpen, Calculator, FileText, Lightbulb, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { shopProducts } from "@/data/mockData";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-3.5 ${
              i < Math.floor(rating)
                ? "fill-xp text-xp"
                : i < rating
                  ? "fill-xp/50 text-xp"
                  : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating} ({count})
      </span>
    </div>
  );
}

interface ToolkitModal {
  title: string;
  icon: React.ReactNode;
  description: string;
  preview: React.ReactNode;
}

const toolkitModals: Record<string, ToolkitModal> = {
  gpaCalculator: {
    title: "GPA Calculator",
    icon: <Calculator className="size-5" />,
    description: "Calculate and track your cumulative GPA across all courses",
    preview: (
      <div className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-4 space-y-3">
          <div className="text-sm font-semibold text-foreground mb-3">Course Grades</div>
          <div className="space-y-2">
            {[
              { course: "Advanced Mathematics", grade: "A", credits: 4 },
              { course: "Biology", grade: "A-", credits: 3 },
              { course: "English Literature", grade: "B+", credits: 3 },
              { course: "US History", grade: "A", credits: 3 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item.course}</span>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{item.grade}</Badge>
                  <span className="text-xs text-muted-foreground w-12 text-right">{item.credits} credits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
          <div className="text-sm text-muted-foreground mb-1">Cumulative GPA</div>
          <div className="text-3xl font-bold text-primary">3.8</div>
        </div>
      </div>
    ),
  },
  coursePlanning: {
    title: "Course Planning Guide",
    icon: <FileText className="size-5" />,
    description: "Map your academic path with recommended courses and prerequisites",
    preview: (
      <div className="space-y-4">
        <div className="space-y-3">
          {[
            { semester: "Fall 2024", courses: ["Precalculus", "Chemistry I", "World History"] },
            { semester: "Spring 2025", courses: ["Calculus AB", "Chemistry II", "AP English"] },
            { semester: "Fall 2025", courses: ["AP Calculus", "Physics I", "Economics"] },
          ].map((period, idx) => (
            <div key={idx} className="rounded-lg border border-border p-3">
              <div className="font-semibold text-sm text-foreground mb-2">{period.semester}</div>
              <div className="space-y-1">
                {period.courses.map((course, cidx) => (
                  <div key={cidx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="inline-block size-1.5 rounded-full bg-primary" />
                    {course}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  collegeReadiness: {
    title: "College Readiness",
    icon: <Lightbulb className="size-5" />,
    description: "Prepare for college with SAT/ACT prep, essays, and admissions timeline",
    preview: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "SAT Score", value: "1480", subtitle: "96th percentile" },
            { label: "AP Exams", value: "5/5", subtitle: "All passing scores" },
            { label: "Essays", value: "3/5", subtitle: "Drafted and reviewed" },
            { label: "Schools", value: "8/10", subtitle: "Applications submitted" },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-lg font-bold text-primary">{item.value}</div>
              <div className="text-xs font-medium text-foreground mt-1">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.subtitle}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-accent/10 p-3 border border-accent/20">
          <div className="text-sm font-semibold text-accent-foreground">Next Milestone: College Acceptance Decision (May 2025)</div>
        </div>
      </div>
    ),
  },
  scholarships: {
    title: "Scholarships",
    icon: <Award className="size-5" />,
    description: "Track, apply, and win scholarships worth thousands",
    preview: (
      <div className="space-y-4">
        <div className="space-y-3">
          {[
            { name: "National Merit Scholarship", amount: "$10,000/yr", status: "Awarded" },
            { name: "Future Leaders Grant", amount: "$5,000", status: "Applied" },
            { name: "STEM Excellence Fund", amount: "$8,000/yr", status: "Under Review" },
          ].map((scholarship, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-semibold text-foreground">{scholarship.name}</div>
                <div className="text-sm text-muted-foreground">{scholarship.amount}</div>
              </div>
              <Badge variant={scholarship.status === "Awarded" ? "default" : "secondary"}>
                {scholarship.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 border border-primary/20">
          <div className="text-sm text-muted-foreground">Total Awarded</div>
          <div className="text-2xl font-bold text-primary">$23,000/year</div>
        </div>
      </div>
    ),
  },
};

function ToolkitModal({ toolKey, open, onOpenChange }: { toolKey: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const modal = toolkitModals[toolKey];
  if (!modal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {modal.icon}
              </div>
              <DialogTitle className="text-xl">{modal.title}</DialogTitle>
            </div>
            <DialogClose className="mt-0">
              <X className="size-5" />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 text-white hover:bg-orange-600">Coming in Phase 2</Badge>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{modal.description}</p>
            <div className="rounded-lg bg-card border border-border p-4">
              {modal.preview}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function HomeschoolShop() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8">
      {/* Hero Banner */}
      <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-nexus/10 border border-primary/10 p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-6" />
          </div>
          <div className="flex-1">
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Future Readiness Bundles & Programs
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-curated learning paths by Anna Pierre. For Middle School (6th-8th Grade) • Career-Ready • Life Skills • Academic Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Student Success Toolkit */}
      <div>
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
          Student Success Toolkit
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(toolkitModals).map(([key, toolkit]) => (
            <Card
              key={key}
              className="group cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
              onClick={() => setOpenModal(key)}
            >
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-3">
                  {toolkit.icon}
                </div>
                <CardTitle className="text-base group-hover:text-primary transition-colors">
                  {toolkit.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {toolkit.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Click to preview</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
          Featured Bundles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shopProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="text-xs">
                    <BookOpen className="size-3 mr-1" />
                    {product.grade}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.subject}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 mt-auto">
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <StarRating rating={product.rating} count={product.reviewCount} />
                  </div>
                  <Button className="gap-2">
                    <ShoppingCart className="size-4" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal Instances */}
      {Object.keys(toolkitModals).map((key) => (
        <ToolkitModal
          key={key}
          toolKey={key}
          open={openModal === key}
          onOpenChange={(open) => setOpenModal(open ? key : null)}
        />
      ))}
    </div>
  );
}
