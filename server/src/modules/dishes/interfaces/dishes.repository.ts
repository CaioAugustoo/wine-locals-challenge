import { ListDishesDtoOutput } from '../dto/list-restaurants-dishes.dto';

export interface IDishesRepository {
  listAll(restaurantId: string): Promise<ListDishesDtoOutput>;
}
