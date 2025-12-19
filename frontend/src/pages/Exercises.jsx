import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Exercises.css'

function Exercises() {
  const [selectedExercise, setSelectedExercise] = useState(null)

  const exercises = [
    {
      id: 1,
      text: "ACCEPT *; A\nif (A.LE.0) S=S+A\nS=A*100–K"
    },
    {
      id: 2,
      text: "МАХ=0\nif (X.GT.MAX) MAX=X\nTYPE *, M"
    },
    {
      id: 3,
      text: "D=B*B=–4*A*C\nif (D.EQ.O) T=–B/(2*A)\nTYPE*, T"
    },
    {
      id: 4,
      text: "S1:=A MOD B;\nS2:=A–((A DIV B)*B);\nif S1=S2 then write ('ВСЁ')"
    },
    {
      id: 5,
      text: "if x>0 then y:=l\nelse if x<0 then y:=2\nelse y:=0"
    },
    {
      id: 6,
      text: "if Y>MIN & Y<MAX then\nPUT LIST (Y);\nelse X=X+1;"
    },
    {
      id: 7,
      text: "Z=Z+1;\nif Z>N then DO;\nZ=Z/N;\nPUT DATA (Z);\nend;"
    },
    {
      id: 8,
      text: "X=X0+(i–l)*H\nif (X.LT.O) Y=X*X\nif (X.GT.O) Y=2*X"
    },
    {
      id: 9,
      text: "if i MOD 2=0 THEN Z:=Z*X;\ni:=i DIY 2;\nX:=X*X*X"
    },
    {
      id: 10,
      text: "READ(B);\nif B>L THEN begin\nA:=A–Z;\nA:=A+B end\nelse B:=L+B"
    },
    {
      id: 11,
      text: "if (X+Y)<>0 THEN\nA:=(X*X+Z*Z)/(1 +1/(X–Y*Z))\nelse A:=0;\nwriteln (A)"
    },
    {
      id: 12,
      text: "A:=-3*C;\nB:=Y*Y*X;\nif (A<0) AND (B>0) THEN\nC:=–A+B\nelse C:=A+B"
    },
    {
      id: 13,
      text: "if T>EPS THEN begin\nK:=K+2;\nT:=–T*SX/(K*(K–1));\nS:=S+T\nend"
    },
    {
      id: 14,
      text: "if N>0 THEN\nM:=–M+l/N;\nB:=M*N+3;\nif B=0 THEN write (N)"
    },
    {
      id: 15,
      text: "if (2.5+0.68<=2.8) OR Y\nAND X OR Z AND NOT Y THEN\nwriteln ('верно')"
    },
    {
      id: 16,
      text: "READ(N);\nM:=0;\nIf f=1 THEN writeln (M)\nElse M:=M+1/N"
    },
    {
      id: 17,
      text: "RESET (F,'F.DAT');\nSUM:=SUM+F^;\nGET (F)"
    },
    {
      id: 18,
      text: "REWRITE (F, 'F.DAT');\nF^:=K*K;\nPUT (F)"
    },
    {
      id: 19,
      text: "READ (x, y);\nA:=x/(y*y*x*x/(y+x/3))"
    },
    {
      id: 20,
      text: "READ (H, В, М);\nPI:=3.14;\nV:=PI*H*(B*B+M*M+B*M)/3"
    },
    {
      id: 21,
      text: "A=Z*Z;\nB=l+A/(3*Z+A/5);\nif B>5 THEN writeln (B)"
    },
    {
      id: 22,
      text: "if x<0.5 THEN y=2*x*x-x\nelse y=x*x/(x–0.1);\nwrite (y)"
    },
    {
      id: 23,
      text: "READ (A, B);\nIF A>B THEN X=2*A+2/B+4;\nIF A<=B THEN x=(A+B)*(A–B);\nwriteln (x)"
    },
    {
      id: 24,
      text: "READ (I);\nif (I>4) OR (I<0) THEN\nwriteln ('ошибка')"
    },
    {
      id: 25,
      text: "if A<0 THEN A=–A;\nif B<0 THEN B=–B;\nSA:=(A+B)/2;\nSB:=A*B/2"
    },
    {
      id: 26,
      text: "READLN (Y);\nif Y<0 THEN\nZ:=Y-3*Y*Y/(Y+1)\nelse if Y=0 THEN Z:=0\nelse Z:=100*Y"
    }
  ]

  const tasks = [
    "Записать грамматику и построить синтаксическое дерево для заданного предложения.",
    "Привести алгоритм лексического анализа для заданного предложения.",
    "Привести алгоритм синтаксического анализа методом рекурсивного спуска для заданного предложения.",
    "Представить матрицу отношений предшествования для заданного предложения.",
    "Привести алгоритм синтаксического анализа методом операторного предшествования для заданного предложения."
  ]

  const handleExerciseClick = (exerciseId) => {
    if (selectedExercise === exerciseId) {
      setSelectedExercise(null)
    } else {
      setSelectedExercise(exerciseId)
    }
  }

  return (
    <div className="exercises-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / Упражнения
        </nav>
        
        <h1>УПРАЖНЕНИЯ</h1>
        
        <div className="tasks-list">
          <h2>Задания для выполнения:</h2>
          <ol className="tasks-ol">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ol>
        </div>

        <div className="exercises-section">
          <h2>Варианты упражнений:</h2>
          <div className="exercises-grid">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="exercise-item">
                <button
                  className={`exercise-btn ${selectedExercise === exercise.id ? 'active' : ''}`}
                  onClick={() => handleExerciseClick(exercise.id)}
                >
                  Упражнение {exercise.id}
                  <span className="toggle-icon">
                    {selectedExercise === exercise.id ? '▼' : '▶'}
                  </span>
                </button>
                {selectedExercise === exercise.id && (
                  <div className="exercise-content">
                    <div className="code-block">
                      <pre>{exercise.text}</pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="chapter-navigation">
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>
    </div>
  )
}

export default Exercises
