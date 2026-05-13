import { useState } from "react";
import {
  Sparkles,
  FileText,
  Gamepad2,
  BookOpen,
  Download,
  Eye,
  Search,
  ArrowRight,
  Mic,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { aiArtifacts, students } from "@/data/mockData";
import { CurriculumIntakeModal } from "@/components/curriculum-intake-modal";
import { StudentRoster } from "@/components/student-roster";

const artifactIcons: Record<string, React.ElementType> = {
  FileText,
  Gamepad2,
  BookOpen,
};

const artifactColors: Record<string, string> = {
  PDF: "bg-primary text-primary-foreground",
  Game: "bg-xp text-xp-foreground",
  Outline: "bg-nexus text-nexus-foreground",
};

export function TutorCommandCenter() {
  const [commandValue, setCommandValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-8 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Tutor Command Center
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, Anna Pierre. Your AI teaching assistant is ready.
            </p>
          </div>
          <Button
            onClick={() => setIntakeModalOpen(true)}
            className="h-11 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0"
          >
            <UserPlus className="size-5" />
            New Student Intake
          </Button>
        </div>

        {/* AI Command Bar */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-5 text-accent" />
              <span className="text-sm font-semibold text-primary">AI Command Bar</span>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={commandValue}
                  onChange={(e) => setCommandValue(e.target.value)}
                  placeholder="e.g., Generate a high school prep guide for a 7th grader..."
                  className="h-12 pl-10 pr-12 text-base bg-white border-primary/20 focus-visible:ring-primary/40"
                />
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                    isListening
                      ? "bg-primary text-primary-foreground animate-pulse"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  title="Voice input"
                >
                  <Mic className="size-5" />
                </button>
              </div>
              <Button size="lg" className="h-12 px-6 gap-2 bg-primary hover:bg-primary/90">
                <Sparkles className="size-4" />
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent AI Artifacts */}
        <div>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
            Recent AI Artifacts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiArtifacts.map((artifact) => {
              const IconComp = artifactIcons[artifact.icon];
              const colorClass = artifactColors[artifact.type];
              return (
                <Card key={artifact.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`flex size-10 items-center justify-center rounded-lg ${colorClass}`}>
                        <IconComp className="size-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {artifact.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-base mt-2">{artifact.title}</CardTitle>
                    <CardDescription>{artifact.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{artifact.createdAt}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="size-8">
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8">
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Student Roster & Analytics */}
        <StudentRoster />

        {/* Pedagogical Memory & Student Tracking */}
        <div>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
            Pedagogical Memory & Student Tracking
          </h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="pl-4">Student Name</TableHead>
                    <TableHead>Current Level / XP</TableHead>
                    <TableHead>Last Concept Struggled With</TableHead>
                    <TableHead className="pr-4">AI Recommended Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <Avatar size="default">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {student.avatarFallback}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.grade} Grade</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant="secondary" className="w-fit">
                            Level {student.level}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {student.xp} / {student.xpToNext} XP
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-destructive">
                          {student.lastStruggledWith}
                        </span>
                      </TableCell>
                      <TableCell className="pr-4">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="size-4 mt-0.5 text-primary shrink-0" />
                          <span className="text-sm">{student.aiRecommendedAction}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      <CurriculumIntakeModal open={intakeModalOpen} onOpenChange={setIntakeModalOpen} />
    </>
  );
}
