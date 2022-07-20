import one from "../../../Feature/Images/SDG Icons/1.png";
import two from "../../../Feature/Images/SDG Icons/2.png";
import three from "../../../Feature/Images/SDG Icons/3.png";
import four from "../../../Feature/Images/SDG Icons/4.png";
import five from "../../../Feature/Images/SDG Icons/5.png";
import six from "../../../Feature/Images/SDG Icons/6.png";
import seven from "../../../Feature/Images/SDG Icons/7.png";
import eight from "../../../Feature/Images/SDG Icons/8.png";
import nine from "../../../Feature/Images/SDG Icons/9.png";
import ten from "../../../Feature/Images/SDG Icons/10.png";
import eleven from "../../../Feature/Images/SDG Icons/11.png";
import twelve from "../../../Feature/Images/SDG Icons/12.png";
import thirteen from "../../../Feature/Images/SDG Icons/13.png";
import fourteen from "../../../Feature/Images/SDG Icons/14.png";
import fivtheen from "../../../Feature/Images/SDG Icons/15.png";
import sixteen from "../../../Feature/Images/SDG Icons/16.png";
import seventeen from "../../../Feature/Images/SDG Icons/17.png";
import UNDPDropdown from "./dropdown";
import { SDG_list } from "./sdgList";
import color from "../../../Feature/Config/color";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";

const EditMenu = (props) => {
  const { sdgId, handleSDGSelect, isEnabled, relatedTargets, _handleGoToEdit } =
    props;
  const imageName = () => {
    return sdgId === 1
      ? one
      : sdgId === 2
      ? two
      : sdgId === 3
      ? three
      : sdgId === 4
      ? four
      : sdgId === 5
      ? five
      : sdgId === 6
      ? six
      : sdgId === 7
      ? seven
      : sdgId === 8
      ? eight
      : sdgId === 9
      ? nine
      : sdgId === 10
      ? ten
      : sdgId === 11
      ? eleven
      : sdgId === 12
      ? twelve
      : sdgId === 13
      ? thirteen
      : sdgId === 14
      ? fourteen
      : sdgId === 15
      ? fivtheen
      : sdgId === 16
      ? sixteen
      : seventeen;
  };
  var realatedTargetsGroup =
    relatedTargets &&
    relatedTargets.reduce(function (targets, org) {
      (targets[org.sdg_id] = targets[org.sdg_id] || []).push(org);
      return targets;
    }, []);

  return (
    <div className="">
      <div className={`row text-left`}>
        <div className="col-lg-3 col-sm-6 py-2">
          <UNDPDropdown
            notClearable
            disabled={isEnabled}
            selectedIndex={sdgId - 1}
            options={SDG_list}
            handleSelect={handleSDGSelect}
          />
        </div>
        <div className="col-lg-3 col-sm-6 py-2">
          <ESButton
            text={"Edit Selected Target"}
            rightIcon={<i className="fa fa-arrow-right pl-2" />}
            onClick={() => _handleGoToEdit()}
          />
        </div>
      </div>
      <div className="row py-2">
        <div className="col-lg-3 py-2 col-sm-6">
          <img src={imageName()} width={180} />
        </div>
        <div className={`col-lg-3 text-left col-sm-6`}>
          <div className="font-weight-bold" style={{ color: color.greyColor }}>
            TARGET
          </div>
          <div
            className="my-2 p-2 rounded"
            style={{
              background: color.sdgColors[sdgId - 1],
              color: "#fff",
            }}
          >
            {relatedTargets && relatedTargets.target}
          </div>
        </div>
        <div className={`text-left`}>
          <div className="font-weight-bold" style={{ color: color.greyColor }}>
            PIRORITY THEME
          </div>
          <div
            className="my-2 px-2"
            style={{
              background: color.sectorColor[0],
              color: "#fff",
              borderRadius: 25,
            }}
          >
            Social Inclusion
          </div>
        </div>
      </div>
      <div className={`text-left py-2`}>
        <span className="font-weight-bold" style={{ color: color.greyColor }}>
          Related Target(s)
        </span>
        <hr />
        <div className="d-flex flex-row flex-wrap">
          {realatedTargetsGroup &&
            realatedTargetsGroup.map((v) => (
              <div className="p-1">
                {v.map((x, y) => (
                  <div
                    className="p-2 border my-1 rounded"
                    style={{
                      background: color.sdgColors[x.sdg_id - 1],
                      color: "#fff",
                    }}
                  >
                    Target {x.sdg_id + "." + x.sdg_target_id}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
