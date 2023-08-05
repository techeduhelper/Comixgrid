import bcrypt from 'bcrypt';


export const hassPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hassedPassword = await bcrypt.hash(password, saltRounds);
        return hassedPassword;
    } catch (error) {
        console.log(error)
    }
}

// function for comparing

export const comparePassword = async (password, hassedPassword) => {
    return bcrypt.compare(password, hassedPassword);
};