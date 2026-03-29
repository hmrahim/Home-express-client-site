import { useForm } from "react-hook-form";

const HomeSettings = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Home Page Settings
        </h1>
        <p className="text-gray-500">
          Customize the appearance and content of your homepage
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* PAGE STYLE */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">
            Page Style
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="text-sm text-gray-600">
                Background Color
              </label>
              <input
                type="color"
                {...register("pageBgColor")}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Background Image
              </label>
              <input
                type="file"
                {...register("pageBgImage")}
                className="mt-2 block w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Container Width
              </label>

              <select
                {...register("containerWidth")}
                className="mt-2 w-full border rounded-lg p-2"
              >
                <option value="max-w-5xl">Medium</option>
                <option value="max-w-6xl">Large</option>
                <option value="max-w-7xl">Extra Large</option>
                <option value="w-full">Full Width</option>
              </select>
            </div>

          </div>
        </div>


        {/* HERO SECTION */}

        <div className="bg-white border rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold mb-6">
            Hero Section
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-600">
                Hero Title
              </label>

              <input
                {...register("heroTitle")}
                className="mt-2 w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Button Text
              </label>

              <input
                {...register("heroButtonText")}
                className="mt-2 w-full border rounded-lg p-2"
              />
            </div>

            <div className="md:col-span-2">

              <label className="text-sm text-gray-600">
                Hero Subtitle
              </label>

              <textarea
                {...register("heroSubtitle")}
                rows="3"
                className="mt-2 w-full border rounded-lg p-2"
              />

            </div>

            <div>
              <label className="text-sm text-gray-600">
                Background Color
              </label>

              <input
                type="color"
                {...register("heroBgColor")}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Text Color
              </label>

              <input
                type="color"
                {...register("heroTextColor")}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Overlay Color
              </label>

              <input
                type="color"
                {...register("heroOverlay")}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Background Image
              </label>

              <input
                type="file"
                {...register("heroBgImage")}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Button Link
              </label>

              <input
                {...register("heroButtonLink")}
                className="mt-2 w-full border rounded-lg p-2"
              />
            </div>

          </div>
        </div>


        {/* THEME COLORS */}

        <div className="bg-white border rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold mb-6">
            Theme Colors
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="text-sm text-gray-600">
                Primary Color
              </label>
              <input type="color" {...register("primaryColor")} className="mt-2" />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Secondary Color
              </label>
              <input type="color" {...register("secondaryColor")} className="mt-2" />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Button Color
              </label>
              <input type="color" {...register("buttonColor")} className="mt-2" />
            </div>

          </div>

        </div>


        {/* SECTION VISIBILITY */}

        <div className="bg-white border rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold mb-6">
            Section Visibility
          </h2>

          <div className="space-y-3">

            <label className="flex items-center gap-3">
              <input type="checkbox" {...register("heroSection")} />
              Hero Section
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" {...register("featuresSection")} />
              Features Section
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" {...register("testimonialSection")} />
              Testimonials Section
            </label>

          </div>

        </div>


        {/* SAVE BUTTON */}

        <div className="flex justify-end">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Save Changes
          </button>

        </div>

      </form>
    </div>
  );
};

export default HomeSettings;