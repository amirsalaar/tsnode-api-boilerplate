import mongooseService from "../db/mongoose.service";

export interface UserRepository {
    getUserById: (id: string) => Promise<any>;
}

const userRepository = (dbService: typeof mongooseService): UserRepository => {
    return {
        getUserById: async (id: string) => {
            return null;
        },
    };
};

export default userRepository;
