import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rosterStudents } from "@/data/mockData";

export function StudentRoster() {
  const navigate = useNavigate();

  const handleMonitorPortal = (studentId: string, studentName: string) => {
    sessionStorage.setItem("adminViewStudent", JSON.stringify({ id: studentId, name: studentName }));
    navigate("/student");
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-900";
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-900";
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-900";
    return "bg-orange-100 text-orange-900";
  };

  return (
    <div>
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
        Student Roster & Analytics
      </h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="pl-4">Student Name</TableHead>
                <TableHead>Focus Subject</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead>Current Grade</TableHead>
                <TableHead className="pr-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rosterStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="pl-4 font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{student.focusSubject}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {student.assignmentsCompleted}/{student.assignmentsTotal}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getGradeColor(student.currentGrade)}`}>
                      {student.currentGrade}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMonitorPortal(student.id, student.name)}
                      className="gap-2"
                    >
                      <Eye className="size-4" />
                      Monitor Portal
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
