import { defineStore } from "pinia";
import { ref } from "vue";
import { PROFILE_CONSTS } from "@/library/consts";
import _ from "lodash";

export const useStorage = defineStore(
    "storage",
    () => {
        let state = ref({
            jwt: "",
            account: {},
            accountId: 0,
        });

        function commitMe(data: any) {
            state.value.accountId = data?.account_id || 0;
            state.value.account = data;
        }

        function commitJWT(jwtToken: string) {
            state.value.jwt = jwtToken;
        }

        return { state, commitMe, commitJWT };
    },
    {
        persist: {
            enabled: true,
            strategies: [{ storage: localStorage, paths: ["state"] }],
        },
    }
);

export function getDefaultProfile() {
    return _.cloneDeep(PROFILE_CONSTS.DEFAULT_PROFILE);
}
