import { ListDishesDto, ListDishesDtoOutput } from '../dto/list-all-dishes.dto';

export interface IDishesRepository {
  listAll(dto: ListDishesDto): Promise<ListDishesDtoOutput>;
}
