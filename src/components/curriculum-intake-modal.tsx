import { useState } from "react";
import { Sparkles, CircleCheck as CheckCircle, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

interface CurriculumIntakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ModalState = "form" | "generating" | "success";

export function CurriculumIntakeModal({ open, onOpenChange }: CurriculumIntakeModalProps) {
  const [state, setState] = useState<ModalState>("form");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [copiedCredentials, setCopiedCredentials] = useState(false);

  const handleGenerate = () => {
    if (studentName && grade && subject && learningGoal) {
      setState("generating");
      // Simulate generation delay
      setTimeout(() => {
        setState("success");
      }, 2500);
    }
  };

  const handleClose = () => {
    setState("form");
    setStudentName("");
    setGrade("");
    setSubject("");
    setLearningGoal("");
    onOpenChange(false);
  };

  const handleNewIntake = () => {
    setState("form");
    setStudentName("");
    setGrade("");
    setSubject("");
    setLearningGoal("");
    setCopiedCredentials(false);
  };

  const generateUsername = () => {
    return `${studentName.toLowerCase().replace(/\s+/g, '')}@student.visionaries.com`;
  };

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8).toUpperCase();
  };

  const handleCopyCredentials = () => {
    const username = generateUsername();
    const password = generatePassword();
    const text = `Username: ${username}\nTemporary Password: ${password}`;
    navigator.clipboard.writeText(text);
    setCopiedCredentials(true);
    setTimeout(() => setCopiedCredentials(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {state === "form" && (
          <>
            <DialogHeader>
              <DialogTitle>New Student Intake</DialogTitle>
              <DialogDescription>
                Create a personalized 4-week learning path for your student
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Student Name</Label>
                <Input
                  id="student-name"
                  placeholder="e.g., Emma Chen"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger id="grade" className="bg-white">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6th">6th Grade</SelectItem>
                      <SelectItem value="7th">7th Grade</SelectItem>
                      <SelectItem value="8th">8th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Focus Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject" className="bg-white">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="life-skills">Life Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="learning-goal">Specific Learning Goal or Struggle</Label>
                <Textarea
                  id="learning-goal"
                  placeholder="e.g., Needs help balancing equations and building confidence"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  rows={4}
                  className="resize-none bg-white"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!studentName || !grade || !subject || !learningGoal}
                className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                <Sparkles className="size-5" />
                Generate 4-Week Learning Path
              </Button>
            </div>
          </>
        )}

        {state === "generating" && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Spinner className="size-8" />
            <p className="text-sm text-muted-foreground animate-pulse">
              AI analyzing curriculum standards...
            </p>
          </div>
        )}

        {state === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                Curriculum Generated
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <p className="text-sm font-semibold text-green-900">
                  Curriculum successfully generated and deployed to {studentName}'s Portal.
                </p>
              </div>

              <div className="space-y-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 text-sm">Account Provisioned</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-blue-900 block mb-1">Username</label>
                    <div className="flex items-center gap-2 bg-white rounded border border-blue-100 px-3 py-2">
                      <code className="text-sm text-foreground flex-1">{generateUsername()}</code>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-blue-900 block mb-1">Temporary Password</label>
                    <div className="flex items-center gap-2 bg-white rounded border border-blue-100 px-3 py-2">
                      <code className="text-sm text-foreground flex-1">{generatePassword()}</code>
                    </div>
                  </div>
                  <Button
                    onClick={handleCopyCredentials}
                    variant="outline"
                    className="w-full gap-2 mt-2 text-xs"
                    size="sm"
                  >
                    {copiedCredentials ? (
                      <>
                        <Check className="size-4" />
                        Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        Copy Credentials to Clipboard
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">4-Week Learning Path Summary</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm font-medium">Week 1: Fundamentals</p>
                    <p className="text-xs text-muted-foreground">Core concepts and foundational theory</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm font-medium">Week 2: Interactive Practice</p>
                    <p className="text-xs text-muted-foreground">Hands-on exercises and problem-solving</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm font-medium">Week 3: Application & Mastery</p>
                    <p className="text-xs text-muted-foreground">Real-world scenarios and advanced practice</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm font-medium">Week 4: Assessment & Optimization</p>
                    <p className="text-xs text-muted-foreground">Comprehensive evaluation and personalized adjustments</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleNewIntake}
                  variant="outline"
                  className="flex-1"
                >
                  Create Another
                </Button>
                <Button
                  onClick={handleClose}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
