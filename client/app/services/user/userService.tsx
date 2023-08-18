// import User from "./dto/user";
// class UserService {
//   public async create(createUserInput: User) {
//     let result = await http.post(
//       "api/services/app/User/Create",
//       createUserInput
//     );
//     return result.data.result;
//   }

//   public async update(updateUserInput: User) {
//     const res = await fetch(process.env.AUTH_API + "/Auth/Sign", options);
//     const user = await res.json();

//     let result = await http.put(
//       "api/services/app/User/Update",
//       updateUserInput
//     );
//     return result.data.result;
//   }

//   public async delete(userId: number) {
//     let result = await http.delete("api/services/app/User/Delete", {
//       params: entityDto,
//     });
//     return result.data;
//   }

//   public async UserDetail(userId: number) {
//     let result = await http.get("api/services/app/User/GetRoles");
//     return result.data.result.items;
//   }

//   public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
//     let result = await http.post(
//       "api/services/app/User/ChangeLanguage",
//       changeLanguageInput
//     );
//     return result.data;
//   }

//   public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
//     let result = await http.get("api/services/app/User/Get", {
//       params: entityDto,
//     });
//     return result.data.result;
//   }

//   public async getAll(
//     pagedFilterAndSortedRequest: PagedUserResultRequestDto
//   ): Promise<PagedResultDto<GetAllUserOutput>> {
//     let result = await http.get("api/services/app/User/GetAll", {
//       params: pagedFilterAndSortedRequest,
//     });
//     return result.data.result;
//   }
// }

// export default new UserService();
