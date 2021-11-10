import React from 'react';
import Button from 'components/common/Button';
import Input from 'components/common/Input';

interface SkillUpdatrProps {
  label: string;
  value: number;
  maxPropertyValue: number;
  minPropertyValue: number;
  onChange: (updatedSkillValue: number) => void;
}

const SkillUpdater: React.FC<SkillUpdatrProps> = ({
  label,
  value,
  maxPropertyValue,
  minPropertyValue,
  onChange,
}) => {
  const [skillValue, setSkillValue] = React.useState<number>(value);

  const handleChange = (updatedSkillValue: number): void => {
    setSkillValue(updatedSkillValue);
    onChange(updatedSkillValue);
  };

  const getSkillPointsNeeded = (
    updatedSkillValue: number,
    skillLabel: string
  ): number => {
    const skillPointsNeeded =
      updatedSkillValue === 0 || skillLabel === 'Health'
        ? 1
        : Math.ceil(updatedSkillValue / 5);
    return skillPointsNeeded;
  };

  React.useEffect(() => {
    setSkillValue(value);
  }, [value]);

  return (
    <div className='flex flex-col justify-center pb-2'>
      <label htmlFor={label.toLowerCase()} className='mr-2 font-sans'>
        <span className='uppercase'>{label}</span> (cost :{' '}
        {getSkillPointsNeeded(skillValue, label)} SkillPoint
        {getSkillPointsNeeded(skillValue, label) > 1 && 's'})
      </label>
      <div className='flex items-center'>
        <Button
          className='font-sans'
          disabled={skillValue <= minPropertyValue}
          onClick={() => handleChange(skillValue - 1)}
          type='button'
        >
          {'<'}
        </Button>
        <Input
          type='number'
          min={minPropertyValue}
          max={maxPropertyValue}
          value={skillValue}
          className='w-12 px-2 font-mono text-xl text-center'
          onChange={(event) => {
            let newValue = parseInt(event.target.value);
            if (newValue < minPropertyValue) {
              newValue = minPropertyValue;
            }
            if (newValue > maxPropertyValue) {
              newValue = maxPropertyValue;
            }
            handleChange(newValue);
          }}
        />
        <Button
          className='mr-2 font-sans'
          disabled={skillValue >= maxPropertyValue}
          onClick={() => handleChange(skillValue + 1)}
          type='button'
        >
          {'>'}
        </Button>
        {/* <progress value={skillValue} max={maxPropertyValue}></progress> */}
      </div>
    </div>
  );
};

export default SkillUpdater;
