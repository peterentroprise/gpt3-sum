import { useState } from "react";
import { useRouter } from "next/router";
import { ResponseData } from "./ResponseData";

export const Form = ({ className, children, ...props }) => {
  const router = useRouter();
  const { usePrompt } = router.query;
  const modelCostPerToken = 0.00002;
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(300);
  const [corpus, setCorpus] = useState();
  const [prompt, setPrompt] = useState(
    "Generate summarization bullet points from this transcript"
  );
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    fetch("/api/model", {
      method: "POST",
      body: JSON.stringify({
        corpus: corpus,
        prompt: prompt,
        temperature: temperature,
        maxTokens: maxTokens,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-14">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setCorpus()}
          className=" mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Empty
        </button>
        <button
          type="button"
          onClick={() =>
            setCorpus(
              "in today's clip I'm going to be covering a couple of questions actually what is aquaponics and how does it work And then we'll run through a couple of pros and cons as I see it to setting up a small little backyard aquaponics system like we have behind us here so we'll hook straight on into it and answer the question what is aquaponics Well Aquaponics is the combination of two food production systems The first being aquaculture which is the raising of fish in a controlled environment and the second being hydroponics which is the growing of plants in a soilless medium using nutrient rich water When these two are combined they form a symbiotic relationship or poly culture called aquaponics Now by themselves both aquaculture and hydroponics create a large amount of wastewater which needs to either be filtered which can be quite expensive and added back into the system Or in some cases depending on the local laws can be dumped straight into drains and waterways which can cause huge amounts of damage to the local environment and ecosystems So when hydroponics is integrated into the aquaculture system we get to conserve a lot of the water It gets recycled through the system over and over with very little actually going to waste Plus we also get the added benefit of faster plant growth rates that you traditionally see in most hydroponic systems The reason aquaponics is so great at recycling water through the system rather than sending it out to waste is because of some naturally occurring nitrifying bacteria They're all around us in the atmosphere in the soil and the water Different families different genus So these nitrifying bacteria obtained their energy by oxidizing ammonia and nitrite from the water in the system and turning it into plant available nitrate which isn't toxic to the fish in the aquaponics systems So I really do think that these bacteria are the backbone of the system without them The water wouldn't be clean enough for the fish and the ammonia wouldn't be converted into nitrates so that plants can flourish So they really do perform the key role of bringing these two systems together I think now more about those guys in a moment but for now we'll have a bit of a look at how an aquaponics system works and how the water flows through and gets cleaned for the fish To begin with we need to put some sort of nutrient into the system and that's where the fish feed comes in We drop a couple of pellets in the fish will eat it they'll assimilate the majority of it into their own growth and then the rest of it has to be passed through Now the majority of the ammonia will be excreted through the respiratory system or the gills of the fish with a smaller amount of it leaving out the back passage or the cloaca with the solids waste the ammonia and waste rich water is taken from the fish tank and delivered into a grow bed The grow beds are made up of media and this media provides a home for the nitrifying bacteria to live in So the ammonia enters and the first lot of bacteria gets to work on oxidizing it These bacteria are called Nitrosomonas They will oxidize ammonia into nitrite from there The nitrite is oxidized by another genus of bacteria called nitro back to and they turn the nitrous into the plant available nitrate or N03 So the nitrate is then taken up by the roots of the plants where it's used to facilitate their growth and the clean water is delivered back into the fish tank ready to be loaded up with more ammonia and solid waste to go through the cycle again and again and again So when it comes to the aquaponics systems themselves and their design and their layout there's a whole host of different ways you can configure them So I'm not gonna go into them in this clip here but I will be looking at them in follow up clips But for now I think we'll move on to the pros and cons of having your own aquaponics system in the backyard or as I see them anyway So one of the largest reasons that holds people back from starting an aquaponics system if they've been to a course or visited a shop is the price of the system itself They are rather expensive but you have to keep in mind these tanks grow beds and filters are all purpose built But in saying that if you are quite handy it is fairly cheap to make your own aquaponics system out of recycled drums containers troughs and the commonly seen caged ibc tanks These systems do require a little bit of handyman knowledge because you're using power tools and such which can be another drawback But if you have the ability to source these materials and you have the tools on hand they will reduce the cost of your startup system dramatically Another big whammy when it comes to the cost is a lot of people will see the little clay balls like we use in our system here Those things can be quite expensive up to a dollar a litre to purchase them and use them in the system Now there are cheaper alternatives much cheaper alternatives There's things like river rock over here we use basalt which is also known as road base or blue metal rather cheap when you buy them from the landscape suppliers and they're basically a fraction of the cost of the clay media The one downside is clay media is very light The rocks are heavy naturally So you have to make sure you have a nice solid stand for the grow beds or you could end up with a few issues down the line like grow beds sinking into the soil Another con that some people have pointed out with a system like ours is we need to run the power 24 hours a day The reason behind that is we need the water constantly being filtered and cleaned so the fish are as healthy as can be Now we're rather lucky in that we have a feed in solar system on the roof of our house It feeds back into the grid So the electricity we use in our system is subsidized to a point Now you can set up your aquaponics system depending on its size on various DC voltage is a small system could run fine on a small 12 volt system A large system like ours would need a 24 volt system I think having them hooked up to solar is actually seen as a pro to a lot of people who want to live as sustainably as possible and not draw any more energy from the grid So that's something you might want to keep in mind Another con could be depending on the species of fish You use the need to buy commercial fish feed basically because you want your fish to be as healthy as possible And some do have particular nutrient requirements There are other fish though that you can get away with feeding things like duckweed and Ezola and also raising your own compost worms and the little larvae Black soldier fly larvae and also mealworms You just need to do a little bit of research and find which species of fish would be the best for your application if you want to look at growing your own feed for them So enough of the cons and onto the numerous pros of why A lot of people think it's a great idea to grow with aquaponics Firstly a lot of people are attracted because it is an organic growing system basically fish and the bacteria as well in the grow beds they are very susceptible to harsh toxic chemicals So you can't just spray any old insecticide in there to look after aphids even though sometimes I would really like to take a flamethrower to them So it's just one of those things you need to grow as cleanly as possible On the upside you end up with great nutritious food that you can share around with your family and friends knowing that there's no harsh toxic chemicals on their The second reason a lot of people want to get into aquaponics is it's seen as a very sustainable use of our water resources The water in the system is recycled round and round with very little going to waste other than the transpiration from the plants themselves a little bit of evaporation and in some systems people will have a solid filter Some of that water is used to evacuate those solids out of the system I've also come across a number of people who want to stop relying on ocean caught fish for a couple of different reasons so that's what's drawn them to setting up aquaponics system Aquaponics also tend to have very little if no weeds at all We've had a couple pop up in here from when birds and other animals have deposited their waste in there We've had things like tomatoes some native gum trees have sprouted in there and the devil's fig but that's pretty much well it we don't have to spend hours on the weekend out here pulling out weeds and bits and pieces like that So that is seen as a big plus by a lot of people as I mentioned before because we're using hydroponic growing methods with nutrient rich water were also able to get very fast growth rates on some plants particularly the greens in aquaponics systems So we've been able to turn over the plants like asian greens bok choy in a number of weeks from the time they've gone in as seedlings to being harvested and taking into the kitchens Another pro for aquaponics is they actually have a very small footprint for the amount of food that they can produce So if you've only got a balcony in an apartment block or a small courtyard in a townhouse you can actually grow a lot more food in there Then you possibly could if you were growing in containers or in the soil itself you've got the added benefit that with most systems like ours they're raised off the ground so they're able to get a little bit more sunlight which is a bit of a premium in some courtyard based areas Now that brings me on to another point our beds are raised off the ground which makes them excellent for people who have mobility issues People who can't get down to tend garden beds in you know traditional soil garden beds find it quite easy to walk around an aquaponics system where the beds are all at waist height You can also use these systems indoors So if you're in an area like the Northern States of America or in Antarctica you can actually set up an aquaponics system and grow under lights The fish don't require a great amount of UV light and you can buy very efficient LED lights now for the plant side of things So there's no reason you can't set up a small little barrel system or even an ibc tote system if you've got a decent sized garage or basement and grow inside it'll especially come in handy through winter when most people in your neighborhood will have to wind down the veggie patch in the backyard because it's under a foot of snow"
            )
          }
          className=" mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Aquaponics
        </button>
        <button
          type="button"
          onClick={() =>
            setCorpus(
              "Hi I'm wedding and portrait photographer Vanessa Joy And today we're just having a little fun in my studio with a cute little camera and flash So we're using the M 50 Mark two And I have the 22 millimeter F2 lens This is a great lens honestly it's a little bit wide when you think 22 but this is on a PSC sensor which just means it's cropped and it's somewhere around like 35-37 So my goal here I could shoot this in natural light because I have a nice window here But I want to utilize the flash so that I have more control over the light direction where it's coming from in relation to where I want to shoot And for this one I want to get the lights that we have on the wall There are different colors It's pretty fun They're actually christmas colors at the moment But we'll use that and we'll use this V flat to make my little light a big light So let's shoot I'm gonna get a little lower and try to do the tape though like in this way So that yep And then you should look towards me and it kind of okay cute And then kind of just do this yep that looks good Yeah that's perfect Hold that their your hair like cascades down Cool Let's get some horizontal They're the light and I was like gorgeous The light is just amazing actually Let's do something that's a little bit more angular Let's see how that looks And then look up that way again Oh yeah definitely I think I'll go up and down now Make sure it's coming out perfect So these look really great I'm able to point the light right where I want to just using basically bounce flash techniques and it's given me a little bit more control over the quality of light on her face Versus if I just went for natural light cool let me take a natural light shot because I'm gonna have to go up in ISO and down in aperture It's still pretty But I'm sacrificing light direction and I'm sacrificing color And I also have to sacrifice my raising my ISO So it's it's nice but I have a lot more control here and then I can make the background go a bit darker because the light is closer to her face versus letting all the background basically go green like it did here green and red when before If I wanted the green and red I would just incorporate it into the shot So it just gives you a little bit more control and a lot of control out of this little flash So let's go ahead and get to editing before we jump into this Make sure that you download my free posing inspiration guide We could all use some inspiration Get that in the link below with lots of ideas on how to pose groups and individuals Here are my favourite three images which this first one is definitely my ultimate favorite Now I didn't want it to look like Christmas behind here In fact added to this during Christmas which is why those lights had that color on it But let's go ahead and change that up I almost changed the crop on this photo but ended up liking the fact that the window on the left hand side was a little bit off kilter I just think it actually added to this photo versus straightening it The arm caught a little bit more of the flash then I've really wanted it to so I darkened it down a little bit So most of the attention was brought to the face after that and of course messing around with those lights to making them not quite look like christmas and it did change her lip color as well I went through just softened skin like I normally do using my local adjustment brushes which you can grab at presets.breatheyourpassion.com I actually ended up going through here and making a brand new preset for hair shine that is not available yet Anyway just went through and did that skin smoothing brightening up the eyes whitening the eyes a little bit and doing just a tad of contouring whitening the teeth saturating the lips all the things just to make the photo pop Yeah a little bit of a before and after for you And then I went ahead on the other two photos Just added my regular joyfully simple preset Didn't do anything too crazy to these because honestly after editing that first one that was just my favorite I went through and just did a little bit of skin smoothing and then tried black and white on that center one which it was okay But this first one is still my favorite I hope you enjoyed seeing what this little cute camera this little cute flash can do to make really great pro results with entry level gearquire a great amount of UV light and you can buy very efficient LED lights now for the plant side of things So there's no reason you can't set up a small little barrel system or even an ibc tote system if you've got a decent sized garage or basement and grow inside it'll especially come in handy through winter when most people in your neighborhood will have to wind down the veggie patch in the backyard because it's under a foot of snow"
            )
          }
          className=" mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Photography
        </button>
      </div>

      <div className="space-y-8">
        {usePrompt && (
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700"
            >
              Prompt
            </label>

            <div className="mt-1">
              <input
                onChange={(e) => setPrompt(e.target.value)}
                type="text"
                name="prompt"
                id="prompt"
                value={prompt}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Magical command here..."
                aria-describedby="prompt-description"
              />
            </div>
            <p
              className="mt-2 text-sm text-gray-500"
              id="prompt-description"
            >
              The prompt guides the output of GPT3 in natural language.
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor="corpus"
            className="block text-sm font-medium text-gray-700"
          >
            Corpus
          </label>
          <div className="mt-1">
            <textarea
              onChange={(e) => setCorpus(e.target.value)}
              type="text"
              name="corpus"
              id="corpus"
              value={corpus}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter corpus here..."
              aria-describedby="corpus-description"
            />
          </div>
          <p
            className="mt-2 text-sm text-gray-500"
            id="corpus-description"
          >
            The body of work to generate summarization points for.
          </p>
        </div>
        <div>
          <label
            htmlFor="temperature"
            className="block text-sm font-medium text-gray-700"
          >
            Temperature
          </label>
          <div className="mt-1">
            <input
              onChange={(e) => setTemperature(e.target.value)}
              type="number"
              name="temperature"
              value={temperature}
              id="temperature"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter temperature here..."
              aria-describedby="temperature-description"
            />
          </div>
          <p
            className="mt-2 text-sm text-gray-500"
            id="temperature-description"
          >
            Higher values means the model will take more risks. (0-1)
          </p>
        </div>
        <div>
          <label
            htmlFor="maxTokens"
            className="block text-sm font-medium text-gray-700"
          >
            Max Tokens
          </label>
          <div className="mt-1">
            <input
              onChange={(e) => setMaxTokens(e.target.value)}
              type="number"
              name="maxTokens"
              value={maxTokens}
              id="maxTokens"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Magical command here..."
              aria-describedby="maxTokens-description"
            />
          </div>
          <p
            className="mt-2 text-sm text-gray-500"
            id="maxTokens-description"
          >
            The maximum number of tokens to generate in the completion.
            (16-4096)
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className=" mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>

      {data && (
        <ResponseData
          data={data}
          modelCostPerToken={modelCostPerToken}
        />
      )}
    </div>
  );
};
