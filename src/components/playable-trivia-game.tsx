import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleCheck as CheckCircle2, Circle as XCircle, Trophy } from "lucide-react";
import type { GameData } from "@/contexts/CurriculumContext";

interface PlayableTriviaGameProps {
  gameData: GameData;
  onComplete: (score: number, xp: number) => void;
}

export function PlayableTriviaGame({
  gameData,
  onComplete,
}: PlayableTriviaGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = gameData.questions[currentQuestionIndex];
  const totalQuestions = gameData.questions.length;
  const xpPerQuestion = 100;
  const totalXP = Math.round((score / totalQuestions) * (xpPerQuestion * totalQuestions));

  const handleAnswerClick = (option: string) => {
    if (answered) return;

    setSelectedAnswer(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setIsCorrect(null);
    } else {
      setCompleted(true);
      onComplete(score + (isCorrect ? 1 : 0), totalXP);
    }
  };

  if (completed) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    return (
      <Card className="w-full bg-purple-50 border-purple-200">
        <CardHeader className="text-center">
          <Trophy className="size-12 mx-auto mb-4 text-purple-600" />
          <CardTitle className="text-purple-900">Module Complete!</CardTitle>
          <CardDescription className="text-purple-700">
            You've successfully completed the module
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div>
            <div className="text-5xl font-bold text-purple-600 mb-2">{percentage}%</div>
            <p className="text-lg text-purple-900">
              {finalScore} out of {totalQuestions} correct
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-700 mb-2">XP Earned</p>
            <p className="text-3xl font-bold text-purple-600">+{totalXP} XP</p>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-purple-50 border-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-purple-600 text-white">
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </Badge>
          <span className="text-sm font-medium text-purple-700">Score: {score}</span>
        </div>
        <CardTitle className="text-purple-900">{gameData.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-purple-900 mb-6">{currentQuestion.q}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isAnswerCorrect = option === currentQuestion.answer;
              let bgColor = "bg-white hover:bg-purple-100";
              let borderColor = "border-purple-200";
              let textColor = "text-purple-900";

              if (answered) {
                if (isAnswerCorrect) {
                  bgColor = "bg-green-100";
                  borderColor = "border-green-500";
                  textColor = "text-green-900";
                } else if (isSelected && !isAnswerCorrect) {
                  bgColor = "bg-red-100";
                  borderColor = "border-red-500";
                  textColor = "text-red-900";
                } else {
                  bgColor = "bg-gray-50";
                  borderColor = "border-gray-200";
                  textColor = "text-gray-900";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={answered}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${bgColor} ${borderColor} ${textColor} disabled:cursor-not-allowed flex items-center gap-3`}
                >
                  <span className="flex-1">{option}</span>
                  {answered && isAnswerCorrect && (
                    <CheckCircle2 className="size-5 text-green-600 flex-shrink-0" />
                  )}
                  {answered && isSelected && !isAnswerCorrect && (
                    <XCircle className="size-5 text-red-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {answered && (
          <div className="p-4 rounded-lg bg-white border border-purple-200">
            {isCorrect ? (
              <p className="text-green-700 font-medium">Correct! Great job!</p>
            ) : (
              <div>
                <p className="text-red-700 font-medium mb-1">Incorrect</p>
                <p className="text-sm text-red-600">
                  The correct answer is: <span className="font-semibold">{currentQuestion.answer}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {answered && (
          <Button
            onClick={handleNext}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "View Results"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
