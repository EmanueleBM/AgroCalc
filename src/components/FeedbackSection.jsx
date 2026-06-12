import { feedbackHref } from '../config/feedback.js';

function FeedbackSection() {
  return (
    <section className="feedback-section" id="feedback" aria-labelledby="feedback-title">
      <div>
        <p className="eyebrow">Feedback</p>
        <h2 id="feedback-title">¿Que calculadora quieres que anadamos?</h2>
        <p>
          Puedes enviar errores, sugerencias o ideas de nuevas calculadoras para
          futuras versiones de AgroCalc.
        </p>
      </div>
      <a className="feedback-link" href={feedbackHref}>
        Enviar sugerencia
      </a>
    </section>
  );
}

export default FeedbackSection;
