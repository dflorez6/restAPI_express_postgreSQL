//====================
// Model: Message
//====================
const getMessageModel = (sequelize, { DataTypes }) => {
    //--------------------
    // Entity Definition
    //--------------------
    const Message = sequelize.define('message', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    //--------------------
    // Associations
    //--------------------
    Message.associate = (models) => {        
        Message.belongsTo(models.User);
    };

    //--------------------
    // Methods
    //--------------------


    //--------------------
    // Return Entity
    //--------------------
    return Message;

};

// Export Module
export default getMessageModel;