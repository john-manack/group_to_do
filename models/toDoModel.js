'use strict';

const db = require('./conn');

class ToDoModel {
    constructor(id, is_complete, content, user_id_reference) {
        this.id = id;
        this.is_complete = is_complete;
        this.content = content;
        this.user_id_reference = user_id_reference;
    }
    
    static async getList() {
        const response = await db.any(`
            SELECT * FROM to_do_list;
        `);
        return response;
    }

    static async getTaskById(user_id) {
        try {
            const response = await db.any(`
                SELECT * FROM to_do_list WHERE user_id_reference = '${user_id}';
            `);
            return response;
        } catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async addEntry(content, user_id) {
        const response = await db.result(`INSERT INTO to_do_list (is_complete, content, user_id_reference) VALUES ($1, $2, $3)`, [false, content, user_id]);
        return response;
    }

    static async toggleComplete(boolean, to_do_id) {
        try {
            const query = `UPDATE to_do_list SET is_complete = ${boolean} WHERE id = ${to_do_id};`;
            const response = await db.result(query)
            return response;
        } catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    async deleteListItem () {
        const response = await db.result(`DELETE FROM to_do_list WHERE id = $1`, [this.id]);
        return response;
    }

}

module.exports = ToDoModel;