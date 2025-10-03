import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-sky-500 bg-gradient-to-r from-sky-400 via-white to-sky-200 p-12 backdrop-blur-sm md:p-16 lg:p-20">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-orange-500/10" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-sky-900 md:text-5xl lg:text-6xl">
              Ready to Transform Your Networking?
            </h2>
            <p className="mb-8 text-lg text-sky-700 md:text-xl">
              Join thousands of professionals who've already made the switch to
              smart NFC cards. Start making better connections today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                type="button"
                variant="primary"
                className="!bg-sky-600 !text-white hover:!bg-sky-700 focus:!ring-sky-500 flex items-center justify-center"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="!border-sky-700 !text-sky-600 hover:!bg-sky-600 hover:!text-white bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
