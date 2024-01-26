import axios from 'axios';
import type { SafeUser, IAccount } from "~/types";
import { useToastService } from "~/composables/useToast";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null
}

export const useFavorite = ({ listingId }: IUseFavorite) => {
    const toastService = useToastService();

    const toggleFavorite = async (hasFavorited = false) => {

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            const response = await request();

            if (response?.id) {
                toastService.add({
                    severity: "success",
                    summary: "Success",
                    detail: hasFavorited ? "Listing is removed from favorites" : "listing is added to favortes"
                });
            }

        } catch (error) {

            toastService.add({
                severity: "error",
                summary: "Something went wrong.",
            });
        }
    }

    return {
        toggleFavorite
    };
};
