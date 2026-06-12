function ResultCard({ label, value, detail, badge, recommended = false, textValue = false }) {
  const className = [
    'result-item',
    recommended ? 'result-item-recommended' : '',
    textValue ? 'result-item-text' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      <span>{label}</span>
      <strong>{value}</strong>
      {badge ? <mark>{badge}</mark> : null}
      {detail ? <small>{detail}</small> : null}
    </div>
  );
}

export default ResultCard;
