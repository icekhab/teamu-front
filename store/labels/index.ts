import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import LabelsState from '@/entities/states/LabelsState';
import LabelService from '@/services/LabelService';
import LabelEntity from '@/entities/LabelEntity';

export const state = (): LabelsState => ({
  labels: [],
});

export const actions : any = {
  async getLabels(context: ActionContext<LabelsState, RootState>) {
    const labels = await LabelService.get();

    context.commit('setLabels', labels);
  },
};

export const mutations = {
  setLabels(currentState: LabelsState, labels: LabelEntity[]): void {
    currentState.labels = labels;
  },
};
