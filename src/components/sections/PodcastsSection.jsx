import PodcastCard from "./library/PodcastCard";
import useSystemSound from "@/hooks/useSystemSound";

const PodcastsSection = ({ ref }) => {
  const { playSound } = useSystemSound();
  return (
    <section className={`flex flex-col gap-8`} ref={ref} style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-2">
        Listening
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        <PodcastCard
          show="Syntax.fm"
          title="Should a New Coder Use AI"
          episode="978"
          image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/37/48/97/3748974f-e0ae-159f-d869-37e1a146b2ea/mza_6771083142990398129.jpeg/300x300bb.webp"
          link="https://syntax.fm/show/978/should-a-new-coder-use-ai"
          playSound={playSound}
        />

        <PodcastCard
          show="Lex Fridman"
          title="Sam Altman: OpenAI, GPT-5, and AGI"
          episode="367"
          image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/3e/e3/9c/3ee39c89-de08-47a6-7f3d-3849cef6d255/mza_16657851278549137484.png/300x300bb.webp"
          link="https://..."
          playSound={playSound}
        />

        <PodcastCard
          show="Decoder"
          title="Siemens CEO's Mission to Automate Everything"
          image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/35/2c/4e/352c4ee6-46db-7aff-4287-fc9b7cc3e1b6/mza_3811812518505699598.jpg/300x300bb.webp"
          link="https://podcasts.apple.com/in/podcast/siemens-ceos-mission-to-automate-everything/id1011668648?i=1000748886990"
          playSound={playSound}
        />
      </div>
    </section>
  );
};

export default PodcastsSection;
