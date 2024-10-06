import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1 className="mb-4 text-3xl font-bold sm:text-7xl">
              Welcome to <strong>Supayield</strong>
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`Our application is not just a simple tool, it's a real opportunity to optimise your DeFi investments.`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              <Link to="/earn-fuel">Get Started - <strong>Fuel</strong></Link>
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              <Link to="/earn-neox">Get Started - <strong>NeoX</strong></Link>
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                to="https://github.com/1xBuild/supayield"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github repository
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-secondary/50 dark:bg-primary/50 rounded-full blur-3xl"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            width="974.75537"
            height="674.09487"
            viewBox="0 0 974.75537 674.09487"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M200.71917,407.36064c-18.046,14.76488,11.48379,144.36789,11.48379,144.36789s6.56217,197.68563,20.50679,206.70858,45.115-.82032,57.419-2.46083,1.64052-123.86109-16.40545-168.976S269.622,476.26352,269.622,476.26352l97.61237,18.86628s-59.05961,50.0366-56.59878,60.70013,65.62174,46.75545,77.10558,48.396,33.6311-65.62174,53.31769-111.557-134.52456-75.46506-134.52456-75.46506l-21.32711-40.19333S218.76519,392.59577,200.71917,407.36064Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#2f2e41"
            />
            <path
              d="M249.71,761.841s-5.95236,20.83329,0,20.83329,16.865,5.95236,33.73,3.96824,11.90467-22.81735,0-25.79356-8.92851-26.78565-8.92851-26.78565c-3.9683-7.93648-22.81741,1.98412-22.81741,1.98412Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#2f2e41"
            />
            <path
              d="M334.21617,596.17371s-10.21191,19.10945-4.39346,20.36467,15.23047,9.37512,32.13464,10.99219,16.44885-19.79375,5.43949-25.21351-3.079-28.06614-3.079-28.06614c-2.20534-8.59483-22.72269-2.87236-22.72269-2.87236Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#2f2e41"
            />
            <path
              d="M211.7928,229.77171c1.64051,3.28109-5.74192,44.29468-5.74192,44.29468l6.56218,11.48381s37.73255-14.76481,31.99063-17.22565-4.92166-32.81089-4.92166-32.81089S210.15228,226.49062,211.7928,229.77171Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#ffb9b9"
            />
            <circle cx="113.37253" cy="79.16753" r="50.29399" fill="#2f2e41" />
            <circle cx="109.90398" cy="32.08409" r="20.81129" fill="#2f2e41" />
            <path
              d="M231.63121,154.4627a21.0442,21.0442,0,0,0,2.16787.11252,20.81133,20.81133,0,1,0,0-41.62266,21.0442,21.0442,0,0,0-2.16787.11252,20.81211,20.81211,0,0,1,0,41.39762Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#2f2e41"
            />
            <circle cx="114.75567" cy="103.69483" r="34.45142" fill="#ffb9b9" />
            <path
              d="M177.75143,269.55494c-10.66358,2.4608-28.70955,28.70952-28.70955,28.70952L177.75143,326.974s20.5068,77.10557,22.96763,80.38666c16.12166,21.49552,88.58941-26.24868,88.58941-26.24868s-2.871-23.37776-1.23041-34.86157c1.57784-11.04477-6.152-33.221-6.152-33.221s27.069-11.48381,21.32711-22.96762-41.01365-37.7325-55.77852-28.70952-44.29468,0-44.29468,0S188.415,267.09414,177.75143,269.55494Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <path
              d="M387.33106,434.8398s46.75545,40.19337,58.2393,31.99061-44.29468-36.91227-44.29468-36.91227Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#ffb9b9"
            />
            <path
              d="M177.34139,420.89516c6.56218,7.38247,37.73255-11.48381,33.73637-19.86222s-28.81477,8.37841-28.81477,8.37841S170.77921,413.51269,177.34139,420.89516Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#ffb9b9"
            />
            <path
              d="M177.75149,309.74827l-34.45141,63.98122s39.373,32.81092,44.29462,33.63115-9.84327,22.14734-9.84327,22.14734-44.29468-31.17035-61.52039-46.75551,32.8109-84.488,32.8109-84.488l14.76493-9.023Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <path
              d="M277.82469,307.2875,318.018,369.62817s61.52044,68.90288,69.72314,72.18394,18.046-12.3041,18.046-12.3041l-73.82448-89.40967-27.88923-50.0366-10.66353-4.10135Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <ellipse
              cx="113.37253"
              cy="62.76198"
              rx="34.68552"
              ry="20.81131"
              fill="#2f2e41"
            />
            <path
              d="M323.29931,624.742a4.29286,4.29286,0,0,0-4.28784,4.28783V775.27447a4.2928,4.2928,0,0,0,4.28784,4.28777h498.6688a4.29285,4.29285,0,0,0,4.28778-4.28777V629.02977a4.29283,4.29283,0,0,0-4.28778-4.28784Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <path
              d="M329.75661,768.81711H815.51047V635.48718H329.75661Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#fff"
            />
            <path
              d="M754.19649,741.15725a7.10265,7.10265,0,1,0,0,14.20529H782.607a7.10264,7.10264,0,1,0,0-14.20529H754.19649Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#1f1a94"
            />
            <rect
              x="349.1219"
              y="614.42769"
              width="327.96547"
              height="1.86875"
              fill="#e6e6e6"
            />
            <circle cx="280.56677" cy="589.19958" r="41.36917" fill="#1f1a94" />
            <polygon
              points="349.64 603.993 348.604 602.438 382.684 579.717 406.054 590.935 439.669 569.459 506.537 597.983 559.787 571.825 611.495 592.788 676.468 535.241 677.707 536.64 611.867 594.956 559.86 573.871 506.591 600.038 439.843 571.565 406.184 593.071 382.835 581.864 349.64 603.993"
              fill="#3f3d56"
            />
            <path
              d="M467.81765,742.1343a6.07344,6.07344,0,1,0,0,12.14687h63.53747a6.07344,6.07344,0,0,0,0-12.14687Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <path
              d="M408.98917,683.6448h6.46415l-13.45045,13.311a12.5581,12.5581,0,0,1-17.63115,0l-13.44867-13.311h6.46416l10.21748,10.112a7.95365,7.95365,0,0,0,11.167,0ZM377.305,720.65949h-6.46416l13.53272-13.39324a12.55811,12.55811,0,0,1,17.63114,0l13.53272,13.39324h-6.46416l-10.30153-10.19424a7.95365,7.95365,0,0,0-11.167,0Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#fff"
            />
            <path
              d="M388.23446,156.30683a4.29285,4.29285,0,0,0-4.28783,4.28784V306.83934a4.2928,4.2928,0,0,0,4.28783,4.28778H886.90327a4.29287,4.29287,0,0,0,4.28777-4.28778V160.59464a4.29282,4.29282,0,0,0-4.28777-4.28784Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <path
              d="M394.69176,300.382H880.44562V167.05205H394.69176Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#fff"
            />
            <path
              d="M819.13164,272.72212a7.10265,7.10265,0,1,0,0,14.2053h28.41054a7.10265,7.10265,0,0,0,0-14.2053H819.13164Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#1f1a94"
            />
            <rect
              x="414.05705"
              y="145.99257"
              width="327.96547"
              height="1.86875"
              fill="#e6e6e6"
            />
            <circle cx="345.50192" cy="120.76445" r="41.36917" fill="#1f1a94" />
            <polygon
              points="414.575 135.557 413.539 134.002 447.619 111.282 470.989 122.5 504.604 101.024 505.058 101.217 571.472 129.548 624.722 103.39 676.43 124.353 741.403 66.805 742.642 68.204 676.802 126.52 624.795 105.436 571.527 131.603 504.779 103.13 471.119 124.635 447.77 113.427 414.575 135.557"
              fill="#3f3d56"
            />
            <path
              d="M532.7528,273.69917a6.07344,6.07344,0,0,0,0,12.14687h63.53747a6.07343,6.07343,0,1,0,0-12.14687Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <path
              d="M474.76928,228.88845c.77325-5.17689-3.16839-7.95986-8.558-9.8164l1.74833-7.01275-4.26991-1.06383-1.70212,6.82795c-1.121-.27963-2.27356-.54346-3.41884-.80486l1.71428-6.87294-4.26626-1.06383-1.74954,7.01033c-.92887-.21155-1.84073-.42067-2.72583-.64073l.00486-.02188-5.88692-1.46991-1.13556,4.55926s3.16717.72584,3.1003.77082a2.27049,2.27049,0,0,1,1.98905,2.48268l-1.99148,7.989a3.53766,3.53766,0,0,1,.44376.14225l-.44985-.11185-2.7927,11.19147a1.55379,1.55379,0,0,1-1.95623,1.014c.04256.062-3.10273-.77447-3.10273-.77447l-2.11914,4.88753,5.55622,1.38481c1.03343.259,2.0462.53009,3.04194.7854l-1.76656,7.09422,4.26382,1.06383,1.75076-7.01762c1.16353.31611,2.29422.6079,3.40061.88267l-1.74346,6.9848,4.26869,1.06382,1.76656-7.07962c7.279,1.3775,12.75378.82188,15.0553-5.76048,1.85653-5.30091-.09119-8.35865-3.921-10.35379,2.789-.64559,4.89-2.48024,5.45045-6.2699Zm-9.7544,13.67658c-1.32036,5.30091-10.24436,2.43647-13.13919,1.71671l2.34407-9.39694c2.89361.72219,12.17141,2.152,10.79634,7.68023Zm1.31915-13.75317c-1.20365,4.82187-8.63221,2.372-11.04315,1.77142l2.12523-8.52278C459.82705,222.6611,467.58874,223.78208,466.334,228.81186Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#fff"
            />
            <path
              d="M584.4211,390.5244a4.29284,4.29284,0,0,0-4.28783,4.28783V541.0569a4.2928,4.2928,0,0,0,4.28783,4.28778h498.66881a4.29285,4.29285,0,0,0,4.28777-4.28778V394.8122a4.29281,4.29281,0,0,0-4.28777-4.28783Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <path
              d="M590.8784,534.59954h485.75386V401.26962H590.8784Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#fff"
            />
            <path
              d="M1015.31828,506.93968a7.10265,7.10265,0,1,0,0,14.2053h28.41054a7.10265,7.10265,0,1,0,0-14.2053h-28.41054Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#1f1a94"
            />
            <rect
              x="610.24369"
              y="380.21013"
              width="327.96547"
              height="1.86875"
              fill="#e6e6e6"
            />
            <circle cx="541.68856" cy="354.98202" r="41.36917" fill="#1f1a94" />
            <polygon
              points="610.762 369.775 609.725 368.22 643.805 345.5 667.176 356.718 700.79 335.242 701.245 335.435 767.658 363.766 820.909 337.608 872.617 358.57 937.59 301.023 938.829 302.423 872.989 360.738 820.982 339.654 767.713 365.821 700.966 337.348 667.305 358.853 643.957 347.646 610.762 369.775"
              fill="#3f3d56"
            />
            <path
              d="M728.93944,507.91674a6.07343,6.07343,0,0,0,0,12.14687h63.53747a6.07343,6.07343,0,1,0,0-12.14687Z"
              transform="translate(-112.62232 -112.95256)"
              fill="#e6e6e6"
            />
            <polygon
              points="541.684 382.247 558.431 358.662 541.684 368.55 541.684 368.55 524.947 358.662 541.683 382.247 541.683 382.247 541.684 382.247 541.684 382.247 541.684 382.247"
              fill="#fff"
            />
            <polygon
              points="541.683 365.381 541.683 365.381 541.684 365.381 541.684 365.381 558.421 355.488 541.684 327.717 541.684 327.717 541.684 327.717 541.683 327.717 541.683 327.717 524.947 355.488 541.683 365.381"
              fill="#fff"
            />
          </svg>

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
