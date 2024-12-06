import { ElementContainer } from '../elementContainer';

interface MetricCardProps {
  title: string;
  value: string;
  percentage: string;
  info?: string;
}

const MetricCard = ({ title, value, percentage, info } : MetricCardProps) => {
  return (
    <ElementContainer>
      <div>
        <div>
          <label>{title}</label>
          {info && <i>{info}</i>}
        </div>
        <h3>{value}</h3>
        <span>{percentage}</span>
      </div>
    </ElementContainer>
  )
}

export default MetricCard;