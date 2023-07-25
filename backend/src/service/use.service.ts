import dataSource from "../db/connect";
import { User } from "../db/model/user.model";
import { compare, generateToken } from "../util";
import UserDto from "./dto/userDto";

export const createUser = async (userDto: UserDto) => {
    const userRepo = dataSource.getRepository<User>(User);
    const user = userRepo.create();

    Object.keys(userDto).forEach((key: string) => {
        user[key] = userDto[key];
    })

    const newUser = await userRepo.save(user);

    return {
        user: newUser,
        token: generateToken(newUser.id)
    };
}

export const updateUser = async (userDto: UserDto, id: string) => {
    const userRepo = dataSource.getRepository<User>(User);
    const user = await userRepo.findOne({ where: { id } });

    if (!user) throw Error('Provide valid User');

    const updationAllowFields = ["name", "email", "password"];

    Object.keys(userDto).forEach((key: string) => {
        if (updationAllowFields.includes(key)) user[key] = userDto[key];
    })

    const newUser = await userRepo.save(user);

    return {
        user: newUser
    };
}

export const loginUser = async (email: string, password: string) => {
    const userRepo = dataSource.getRepository<User>(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) throw Error("user is not exist");

    const isPssworValid = compare(user.password, password);

    if (!isPssworValid) throw Error("Enter valid password or email");


    return {
        user: user,
        token: generateToken(user.id)
    };
}