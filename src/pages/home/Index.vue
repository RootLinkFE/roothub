<template>
    <div>
        home
        {{author}}
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: 'Home',
    apollo: {
        author: gql`query {
            author(id: 1){
                id
                name
                books {
                    title
                }
            }
        }`
    }
};
</script>