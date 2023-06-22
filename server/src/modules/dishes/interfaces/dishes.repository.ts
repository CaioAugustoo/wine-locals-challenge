import { CreateDishDto, CreateDishDtoOutput } from '../dto/create-dish.dto';
import { ListDishesDto, ListDishesDtoOutput } from '../dto/list-all-dishes.dto';

export interface IDishesRepository {
  listAll(dto: ListDishesDto): Promise<ListDishesDtoOutput>;
  create(dto: CreateDishDto): Promise<CreateDishDtoOutput>;
}
