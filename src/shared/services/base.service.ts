export interface IBaseService<ENTITY, DTO, UPDATE = DTO> {
  // paginate(
  //   { sizePage, currentPage, paginateFilters, paginateOrder }: HttpPaginateBody,
  //   customerId?: number,
  // ): Promise<HttpPaginateResponse<ENTITY>>;
  findById(id: string): Promise<ENTITY | null>;
  findByIdOrThrow(id: string): Promise<ENTITY>;
  create(data: DTO): Promise<ENTITY>;
  updateById(id: string, data: UPDATE): Promise<ENTITY>;
  deleteById(id: string): Promise<void>;
}
