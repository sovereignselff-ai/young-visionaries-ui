import { useState } from "react";
import { Sparkles, Mic, UserPlus, Search, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { CurriculumIntakeModal } from "@/components/curriculum-intake-modal";
import { StudentRoster } from "@/components/student-roster";
import { useCurriculum, type Assignment } from "@/contexts/CurriculumContext";

export function TutorCommandCenter() {
  const [commandValue, setCommandValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const { deployAssignment } = useCurriculum();

  const handleGenerateGame = async () => {
    if (!commandValue.trim()) {
      setDeploymentStatus({
        status: "error",
        message: "Please enter a prompt first",
      });
      return;
    }

    setIsGenerating(true);
    setDeploymentStatus({ status: "loading" });

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const apiUrl = `${supabaseUrl}/functions/v1/generate-game`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          prompt: commandValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate game");
      }

      const gameData = await response.json();

      // Deploy to student (using olivier as default for demo)
      const studentId = "olivier";
      const assignmentId = `game_${Date.now()}`;

      const assignment: Assignment = {
        id: assignmentId,
        studentId,
        gameData,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      deployAssignment(assignment);

      setDeploymentStatus({
        status: "success",
        message: "Module successfully deployed to Student Portal.",
      });

      setCommandValue("");

      setTimeout(() => {
        setDeploymentStatus({ status: "idle" });
      }, 5000);
    } catch (error) {
      console.error("Error generating game:", error);
      setDeploymentStatus({
        status: "error",
        message: error instanceof Error ? error.message : "Failed to generate module",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
                  onKeyPress={(e) => e.key === "Enter" && handleGenerateGame()}
                  placeholder="e.g., Generate a high school prep guide for a 7th grader..."
                  className="h-12 pl-10 pr-12 text-base bg-white border-primary/20 focus-visible:ring-primary/40"
                  disabled={isGenerating}
                />
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                    isListening
                      ? "bg-primary text-primary-foreground animate-pulse"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  title="Voice input"
                  disabled={isGenerating}
                >
                  <Mic className="size-5" />
                </button>
              </div>
              <Button
                onClick={handleGenerateGame}
                size="lg"
                className="h-12 px-6 gap-2 bg-primary hover:bg-primary/90"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="size-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            {/* Loading State */}
            {isGenerating && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 text-primary">
                  <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">AI crafting and deploying module...</span>
                </div>
              </div>
            )}

            {/* Status Messages */}
            {deploymentStatus.status === "success" && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">{deploymentStatus.message}</p>
                  <p className="text-sm text-green-700 mt-1">
                    The module is now available in the Student Portal.
                  </p>
                </div>
              </div>
            )}

            {deploymentStatus.status === "error" && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200 flex items-start gap-3">
                <AlertCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">Generation Failed</p>
                  <p className="text-sm text-red-700 mt-1">{deploymentStatus.message}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
                    <TableHead>Pending Modules</TableHead>
                    <TableHead className="pr-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar size="default">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            OL
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Olivier</div>
                          <div className="text-xs text-muted-foreground">8th Grade</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className="w-fit">
                          Level 5
                        </Badge>
                        <span className="text-xs text-muted-foreground">1200 / 1500 XP</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-900 border-yellow-200">
                        1 Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex items-center gap-2">
                        <div className="size-2 bg-blue-500 rounded-full" />
                        <span className="text-sm">Active</span>
                      </div>
                    </TableCell>
                  </TableRow>
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
