import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
type Props = {
  seconds: number;
};
export default function Countdown({ seconds }: Props) {
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;
  return (
    <NumberFlowGroup>
      <div className="flex items-baseline text-lg font-semibold **:font-mono!">
        <NumberFlow
          value={mm}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
        <NumberFlow
          prefix=":"
          value={ss}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
      </div>
    </NumberFlowGroup>
  );
}
