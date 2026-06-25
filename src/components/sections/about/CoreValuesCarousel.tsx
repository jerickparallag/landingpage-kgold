interface ICoreValue {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface ICoreValuesCarouselProps {
  values: readonly ICoreValue[];
}

export function CoreValuesCarousel({ values }: ICoreValuesCarouselProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {values.map((value) => (
        <article
          key={value.title}
          className="group relative aspect-[4/5] overflow-hidden rounded-brand"
        >
          <img
            src={value.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-300 group-hover:blur-xl"
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-xs font-medium tracking-wide uppercase">
              {value.subtitle}
            </p>
            <h4 className="mt-2 text-lg font-normal tracking-wide">{value.title}</h4>
            <p className="mt-3 text-sm leading-relaxed">{value.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
