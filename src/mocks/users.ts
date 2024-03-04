import { User } from "@/types/user";
import { faker } from "@faker-js/faker";
import paginate from "./_helpers/asPagination";

export const makeUser = () => {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  return {
    id: faker.number.int(100),
    email: faker.internet.email({ firstName: first_name, lastName: last_name }),
    first_name,
    last_name,
    avatar: "/img/user.png",
  } satisfies User;
};

export const usersPage1 = paginate<User>(
  Array.from({ length: 6 }).map(makeUser),
  { page: 1 },
);

export const usersPage2 = paginate<User>(
  Array.from({ length: 6 }).map(makeUser),
  { page: 2 },
);

export default usersPage1.data[0];
