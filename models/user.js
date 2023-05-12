//====================
// Model: User
//====================
const getUserModel = (sequelize, { DataTypes }) => { 
    //--------------------
    // Entity Definition
    //--------------------
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    
    //--------------------
    // Associations
    //--------------------
    User.associate = (models) => {
        // We add the 'CASCADE' flag to our user schema to remove all messages of this user on its deletion
        User.hasMany(models.Message, { onDelete: 'CASCADE' });
    };

    //--------------------
    // Methods
    //--------------------
    // Example Method
    // Let's assume our user entity ends up with an email field in the future. Then we could add a method that 
    // finds a user by their an abstract "login" term, which is the username or email in the end, in the database. 
    // That's helpful when users are able to login to your application via username or email adress.  
    User.findByLogin = async (login) => {
        let user = await User.findOne({
            where: { username: login }
        });

        if (!user)
        {
            user = await User.findOne({
                where: { email: login }
            });
        }

        return user;
    };

    //--------------------
    // Return Entity
    //--------------------
    return User;

};

// Export Module
export default getUserModel;