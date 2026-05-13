import React, { createContext, useContext, useState, useCallback } from "react";

export interface Question {
  q: string;
  options: string[];
  answer: string;
}

export interface GameData {
  title: string;
  questions: Question[];
}

export interface Assignment {
  id: string;
  studentId: string;
  gameData: GameData;
  status: "pending" | "in_progress" | "completed";
  score?: number;
  xpEarned?: number;
  completedAt?: string;
  createdAt: string;
}

export interface StudentStats {
  totalXP: number;
  completedModules: number;
  pendingModules: number;
}

interface CurriculumContextType {
  activeAssignments: Assignment[];
  studentStats: Record<string, StudentStats>;
  deployAssignment: (assignment: Assignment) => void;
  updateAssignmentStatus: (assignmentId: string, status: Assignment["status"], score?: number, xp?: number) => void;
  getStudentAssignments: (studentId: string) => Assignment[];
  getStudentStats: (studentId: string) => StudentStats;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export function CurriculumProvider({ children }: { children: React.ReactNode }) {
  const [activeAssignments, setActiveAssignments] = useState<Assignment[]>([]);
  const [studentStats, setStudentStats] = useState<Record<string, StudentStats>>({
    olivier: {
      totalXP: 1200,
      completedModules: 3,
      pendingModules: 0,
    },
  });

  const deployAssignment = useCallback((assignment: Assignment) => {
    setActiveAssignments((prev) => {
      const filtered = prev.filter((a) => a.id !== assignment.id);
      return [...filtered, assignment];
    });

    setStudentStats((prev) => ({
      ...prev,
      [assignment.studentId]: {
        ...prev[assignment.studentId],
        pendingModules: (prev[assignment.studentId]?.pendingModules || 0) + 1,
      },
    }));
  }, []);

  const updateAssignmentStatus = useCallback(
    (assignmentId: string, status: Assignment["status"], score?: number, xp?: number) => {
      setActiveAssignments((prev) =>
        prev.map((a) => {
          if (a.id === assignmentId) {
            return {
              ...a,
              status,
              score,
              xpEarned: xp,
              completedAt: status === "completed" ? new Date().toISOString() : a.completedAt,
            };
          }
          return a;
        })
      );

      if (status === "completed") {
        setStudentStats((prev) => {
          const assignment = activeAssignments.find((a) => a.id === assignmentId);
          if (!assignment) return prev;

          const studentId = assignment.studentId;
          return {
            ...prev,
            [studentId]: {
              ...prev[studentId],
              totalXP: (prev[studentId]?.totalXP || 0) + (xp || 0),
              completedModules: (prev[studentId]?.completedModules || 0) + 1,
              pendingModules: Math.max(0, (prev[studentId]?.pendingModules || 1) - 1),
            },
          };
        });
      }
    },
    [activeAssignments]
  );

  const getStudentAssignments = useCallback(
    (studentId: string) => activeAssignments.filter((a) => a.studentId === studentId),
    [activeAssignments]
  );

  const getStudentStats = useCallback(
    (studentId: string) =>
      studentStats[studentId] || {
        totalXP: 0,
        completedModules: 0,
        pendingModules: 0,
      },
    [studentStats]
  );

  return (
    <CurriculumContext.Provider
      value={{
        activeAssignments,
        studentStats,
        deployAssignment,
        updateAssignmentStatus,
        getStudentAssignments,
        getStudentStats,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
}

export function useCurriculum() {
  const context = useContext(CurriculumContext);
  if (context === undefined) {
    throw new Error("useCurriculum must be used within CurriculumProvider");
  }
  return context;
}
