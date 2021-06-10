import React from 'react';
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, FileField} from 'react-admin'

const PostList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                 <TextField source="id"/>
                 <TextField source="ref"/>
                 <TextField source="libelle"/>
                 <DateField source="limite"/>
                 <TextField source="lieu"/>
                 <EditButton basePath="/appel_offres" />
                 <DeleteButton basePath="/appel_offres" />
            </Datagrid>
        </List>
    );
}

export default PostList;
