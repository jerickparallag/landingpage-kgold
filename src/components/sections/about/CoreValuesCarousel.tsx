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
          className="group relative aspect-[4/5] overflow-hidden rounded-brand bg-muted"
        >
          <img
            src={value.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-85"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6">
            <div className="relative z-10 text-foreground">
              <p className="text-xs font-medium tracking-wide uppercase opacity-80">
                {value.subtitle}
              </p>
              <h4 className="mt-2 text-base font-normal tracking-wide sm:text-lg">{value.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
