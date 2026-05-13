import { CircleCheck as CheckCircle2, CirclePlay as PlayCircle, Lock, MessageCircle, Trophy, Zap, Star, Calculator, MapPin, SquareCheck as CheckSquare, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AdminViewBanner } from "@/components/admin-view-banner";
import { marcus, marcusHomework, olivier, olivierHomework } from "@/data/mockData";

interface StudentPortalProps {
  student?: "olivier";
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    badgeClass: "bg-success text-success-foreground",
    cardClass: "border-success/30 bg-success/5",
  },
  active: {
    icon: PlayCircle,
    label: "Active",
    badgeClass: "bg-primary text-primary-foreground",
    cardClass: "border-primary/30 bg-primary/5",
  },
  locked: {
    icon: Lock,
    label: "Locked",
    badgeClass: "bg-muted text-muted-foreground",
    cardClass: "opacity-60",
  },
};

export function StudentPortal({ student = "olivier" }: StudentPortalProps) {
  const studentData = student === "olivier" ? olivier : marcus;
  const studentHomework = student === "olivier" ? olivierHomework : marcusHomework;
  const xpPercent = (studentData.xp / studentData.xpToNext) * 100;

  return (
    <>
      <AdminViewBanner />
      <div className="flex flex-col gap-8 p-6 lg:p-8 relative min-h-[calc(100vh-3.5rem)]">
      {/* Gamified Profile Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-xp/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                {studentData.avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  {studentData.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Trophy className="size-4 text-xp" />
                  <Badge className="bg-xp text-xp-foreground font-semibold">
                    Level {studentData.level}: Scholar
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {studentData.grade} Grade
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Zap className="size-4 text-xp" />
                    Study XP
                  </span>
                  <span className="text-muted-foreground">
                    {studentData.xp} / {studentData.xpToNext} XP
                  </span>
                </div>
                <Progress value={xpPercent} className="h-3 bg-primary/10 [&>[data-slot=progress-indicator]]:bg-xp" />
                <p className="text-xs text-muted-foreground">
                  {studentData.xpToNext - studentData.xp} XP to Level {studentData.level + 1}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Homework Hub */}
      <div>
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
          Adaptive Homework Hub
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentHomework.map((task) => {
            const config = statusConfig[task.status];
            const StatusIcon = config.icon;
            return (
              <Card key={task.id} className={`group hover:shadow-md transition-shadow ${config.cardClass}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge className={config.badgeClass}>
                      <StatusIcon className="size-3 mr-1" />
                      {config.label}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 text-xp" />
                      {task.xpReward} XP
                    </div>
                  </div>
                  <CardTitle className="text-base mt-2">{task.title}</CardTitle>
                  <CardDescription>{task.subject}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                    {task.status === "active" && (
                      <Button size="sm" className="gap-1.5">
                        <PlayCircle className="size-4" />
                        Start
                      </Button>
                    )}
                    {task.status === "completed" && (
                      <Button size="sm" variant="outline" className="gap-1.5 border-success/40 text-success hover:bg-success/10">
                        <CheckCircle2 className="size-4" />
                        Review
                      </Button>
                    )}
                    {task.status === "locked" && (
                      <Button size="sm" variant="ghost" disabled className="gap-1.5">
                        <Lock className="size-4" />
                        Locked
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Student Success Toolkit */}
      <div>
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
          Student Success Toolkit
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* GPA Calculator */}
          <Card className="group hover:shadow-md transition-shadow cursor-pointer border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Calculator className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  GPA Calculator
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Track your grades and calculate GPA
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>

          {/* High School Course Planning Guide */}
          <Card className="group hover:shadow-md transition-shadow cursor-pointer border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Course Planning Guide
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Plan your high school path with confidence
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>

          {/* College Readiness Checklist */}
          <Card className="group hover:shadow-md transition-shadow cursor-pointer border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckSquare className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  College Readiness
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Track steps toward college preparation
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>

          {/* Scholarship Info & Career Exploration */}
          <Card className="group hover:shadow-md transition-shadow cursor-pointer border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Scholarships & Careers
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Explore opportunities and funding options
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Ask AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="size-14 rounded-full shadow-lg animate-pulse-glow bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="size-6" />
        </Button>
        <span className="absolute -top-1 -right-1 flex size-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xp opacity-75" />
          <span className="relative inline-flex size-4 rounded-full bg-xp" />
        </span>
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap">
          <span className="text-xs font-medium bg-foreground text-background px-2 py-1 rounded-md shadow-sm">
            Ask AI - 24/7 Help
          </span>
        </div>
      </div>
      </div>
    </>
  );
}
