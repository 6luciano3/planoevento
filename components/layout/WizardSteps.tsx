import { Check } from "lucide-react";

const PASOS = ["Datos del evento", "Ubicación", "Plano base", "Editor"];

interface WizardStepsProps {
  actual: 1 | 2 | 3 | 4;
}

/** Encabezado de progreso del asistente "Nuevo proyecto" (Pantallas 06/08/09 → 15). */
export function WizardSteps({ actual }: WizardStepsProps) {
  return (
    <ol className="wizard-steps">
      {PASOS.map((label, i) => {
        const numero = i + 1;
        const estado = numero < actual ? "hecho" : numero === actual ? "actual" : "pendiente";
        return (
          <li key={label} className={`wizard-step wizard-step-${estado}`}>
            <span className="wizard-step-badge">{estado === "hecho" ? <Check size={14} /> : numero}</span>
            <span className="wizard-step-label">{label}</span>
            {numero < PASOS.length ? <span className="wizard-step-line" aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
