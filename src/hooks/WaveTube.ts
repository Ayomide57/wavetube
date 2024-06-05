import { createClient } from '@supabase/supabase-js'
import { ICreateProfile, IComment, ICreateVideo, IDeleteComment, IFollow, ILike, ISetBio, ISetPfp, ISetUsername, ITips, IUnfollow, IUnlike, IWithdrawTip, IisFollowing } from '@/types';

// a service to interact with the smart contract using SUI SDK

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPERBASE_PROJECT_URL || '';

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPERBASE_API_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default class WaveTubeService {



    async create_profile({ username, bio, pfp, email, wallet }: ICreateProfile) {
        try {
            const { data, error } = await supabase.from('userdb')
                .insert({ email: email, wallet: wallet, bio: bio, username: username, pfp: pfp })

        } catch (error) {
            console.log("Errrr====================================", error)
        }
    }

    async create_video({ title, description, videolink, thumbnailLink, tag, category, user, videoUUid }: ICreateVideo) {

        try {
            const { data, error } = await supabase.from('video')
                .insert({ title: title, description: description, link: videolink, tags: tag, category: category, thumbnail_link: thumbnailLink, user: user, uuid: videoUUid });
            
            console.log("success====================================", error)


        } catch (error) {
            console.log("Errrr====================================", error)
        }
    }

    async getUserInformation(wallet: string | undefined) {
        try {
            const { data, error } = await supabase
            .from('userdb')
            .select('username, email, bio, pfp')
            .eq('wallet', wallet);
            return data;
        } catch (error) {
            console.log("Errrr====================================", error)
        }
    }

    async getVideos() {
        try {
            const { data, error } = await supabase
            .from('video')
                .select();
            return data;
        } catch (error) {
            console.log("Errrr====================================", error)
        }
    }

    async getSingleVideos(id: string) {
        try {
            const { data, error } = await supabase
            .from('video')
                .select().eq('id', id);

            return data;
        } catch (error) {
            console.log("Errrr====================================", error)
        }
    }





    async tip({profileId, amountInSui}: ITips) {
    }

    async isFollowing({Arg0, Arg1}: IisFollowing) {
    }

    async follow({profileId, profileCapId, profileIdFollow}: IFollow) {
    }

    async unfollow({profileId, profileCapId, profileIdUnFollow}: IUnfollow) {
    }
    async withdraw_tip({ profileId, profileCapId, currentAccount }: IWithdrawTip) {
    }

    async set_username({profileId, profileCapId, username}: ISetUsername) {
    }

    async set_pfp({profileId, profileCapId, pfp}: ISetPfp) {
    }

    async set_bio({profileId, profileCapId, bio}: ISetBio) {
    }


    async like({videoStatsId, profileCapId}: ILike) {
    }

    async unlike({videoStatsId, profileCapId}: IUnlike) {
    }

    async comment({videoStatsId, profileCapId, text}: IComment) {
    }

    async delete_profile(profileId: string, profileCapId: string ) {
    }

    async delete_comment({ videoStatsId, profileCapId, commentId }: IDeleteComment) {
    }


}


