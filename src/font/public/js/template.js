$.template = {
    banner1:
        `<div class="ko-box">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="/public/images/default.jpg">
                        <div class="ko-op-sub">
                            <button type="button" class="btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true" onclick="$.editBanner({_t:this})" aria-expanded="false">
                                编辑
                            </button>
                            <button type="button" class="btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true" onclick="$.deleteBanner({_t:this})" aria-expanded="false">
                                删除
                            </button>
                        </div>
                    </div>
                    <div class="swiper-slide"><img src="/public/images/default.jpg">
                        <div class="ko-op-sub">
                            <button type="button" class="btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true" onclick="$.editBanner({_t:this})" aria-expanded="false">
                                编辑
                            </button>
                            <button type="button" class="btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true" onclick="$.deleteBanner({_t:this})" aria-expanded="false">
                                删除
                            </button>
                        </div>
                    </div>
                    <div class="swiper-slide"><img src="/public/images/default.jpg">
                        <div class="ko-op-sub">
                            <button type="button" class="btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true" onclick="$.editBanner({_t:this})" aria-expanded="false">
                                编辑
                            </button>
                            <button type="button" class="btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true" onclick="$.deleteBanner({_t:this})" aria-expanded="false">
                                删除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="ko-op">
                <button type="button" class="btn btn-default btn-sm" data-toggle="dropdown" onclick="$.deleteKo({_t:this})">
                    删除
                </button>
            </div>
        </div>`,
    onlyPic:
        `<div class="ko-box">
            <div class="">
                <div class="">
                    <div class="swiper-slide"><img src="/public/images/default.jpg">
                        <div class="ko-op-sub">
                            <button type="button" class="btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true" onclick="$.editBanner({_t:this})" aria-expanded="false">
                                编辑
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ko-op">
                <button type="button" class="btn btn-default btn-sm" data-toggle="dropdown" onclick="$.deleteKo({_t:this})">
                    删除
                </button>
            </div>
        </div>`,

};