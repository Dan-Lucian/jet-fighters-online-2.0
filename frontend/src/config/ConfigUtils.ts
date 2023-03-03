import { hasObjectKey } from 'utils/generalTypeUtils';
import { IAllJetsConfig } from 'config/interfaces/IAllJetsConfig';
import { IStandartizedJetConfig } from 'config/interfaces/IStandartizedJetConfig';
import { IAllStandartizedJetsConfig } from 'config/interfaces/IAllStandartizedJetsConfig';

// -----------------------------------------------------------------------------
// utils used for jet stats standartization

export function standartizeJetTypesConfig(jets: IAllJetsConfig): IAllStandartizedJetsConfig {
  const jetsCopy: IAllJetsConfig = JSON.parse(JSON.stringify(jets));

  Object.values(jetsCopy).forEach((jet) => {
    delete jet.type;
    delete jet.color;
    delete jet.jetImageSrc;

    Object.keys(jet).forEach((key) => standartizeProp(jet, key, getMin(jets, key), getMax(jets, key)));
  });

  return jetsCopy;
}

function getMin(object: IAllJetsConfig, prop: string): number {
  return Math.min(...Object.values(object).map((value) => value[prop]));
}

function getMax(object: IAllJetsConfig, prop: string): number {
  return Math.max(...Object.values(object).map((value) => value[prop]));
}

function standartizeProp(object: IStandartizedJetConfig, prop: string, min: number, max: number): void {
  if (hasObjectKey(object, prop)) {
    const temp = object[prop];

    const result = (temp - min) / (max - min);

    // (1 + ...) to start from 1
    // (... * 5) to standartize on 5 steps
    const resultRounded = 1 + (Math.round((result + Number.EPSILON) * 100) / 100) * 5;

    object[prop] = resultRounded;
  }
}
