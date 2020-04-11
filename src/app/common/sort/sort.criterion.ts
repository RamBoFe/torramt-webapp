import { CriterionSort } from './sort.interface';
import {
  termsCodec,
  termsColor,
  termsImage,
  termslanguage,
  termsResolution,
  termsRip
} from './sort.terms';

export const criterionResolution: CriterionSort = {
  name : 'resolution',
  terms : termsResolution
};

export const criterionCodec: CriterionSort = {
  name : 'codec',
  terms : termsCodec
};

export const criterionLanguage: CriterionSort = {
  name : 'language',
  terms : termslanguage
};

export const criterionColor: CriterionSort = {
  name : 'color',
  terms : termsColor
};

export const criterionImage: CriterionSort = {
  name : 'image',
  terms : termsImage
};

export const criterionRip: CriterionSort = {
  name : 'rip',
  terms : termsRip
};
